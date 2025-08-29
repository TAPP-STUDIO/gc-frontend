# Frontend AWS Cognito Admin Authentication

## ✅ Implementované komponenty

### 1. **Services**
- `auth.service.ts` - AWS Cognito operace (login, logout, token management)
- `api.service.ts` - Backend API komunikace s automatickým refresh tokenů

### 2. **Context**
- `AuthContext.tsx` - Globální auth state management s React Context

### 3. **Components**
- `ProtectedRoute.tsx` - Route wrapper pro ochranu admin stránek
- `AdminTopBar.tsx` - Upravený s logout funkcionalitou a zobrazením uživatele

### 4. **Pages**
- `/admin/login` - Login stránka s Cognito autentizací
- `/admin/forgot-password` - Reset hesla přes Cognito
- `/admin/unauthorized` - Stránka pro neautorizovaný přístup

### 5. **Config**
- `cognito.ts` - Konfigurace pro AWS Cognito

## 🚀 Rychlý start

### 1. Nainstalujte dependencies

```bash
cd gc-website
npm install
```

### 2. Nastavte environment variables

Vytvořte `.env.local` soubor:

```env
# AWS Cognito Configuration
NEXT_PUBLIC_AWS_REGION=eu-central-1
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID=eu-central-1_XXXXXXXXX
NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID=your-client-id-here

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# Environment
NODE_ENV=development
```

### 3. Spusťte development server

```bash
npm run dev
```

### 4. Otestujte přihlášení

Navštivte: http://localhost:3000/admin/login

## 🔐 Jak to funguje

### Authentication Flow

1. **Login** (`/admin/login`)
   - Uživatel zadá email a heslo
   - Frontend volá AWS Cognito přes `authService.signIn()`
   - Cognito vrátí tokeny (ID, Access, Refresh)
   - Frontend ověří členství ve skupině `gc_super_admins`
   - Backend ověří token a vrátí user data
   - Redirect na `/admin` dashboard

2. **Protected Routes**
   - Všechny admin stránky jsou obalené v `ProtectedRoute`
   - Kontroluje se `isAuthenticated` a `isInAdminGroup`
   - Neautorizovaní uživatelé jsou přesměrováni na `/admin/login`

3. **Token Management**
   - ID token je ukládán v cookies (secure, httpOnly v produkci)
   - Automatický refresh když vyprší (1 hodina)
   - API interceptor automaticky přidává token do headers

4. **Logout**
   - Volá se `authService.signOut()`
   - Vymaže tokeny z cookies a localStorage
   - Redirect na `/admin/login`

### Komponenty

#### AuthContext
```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // user: AdminUser | null
  // isAuthenticated: boolean
  // login: (email, password) => Promise<{success, error?}>
  // logout: () => void
}
```

#### ProtectedRoute
```tsx
<ProtectedRoute requireAdmin={true}>
  {/* Protected content */}
</ProtectedRoute>
```

#### API Service
```tsx
import { apiService } from '@/services/api.service';

// Automaticky přidá auth token
const response = await apiService.getDashboard();
```

## 🎨 UI/UX Features

### Login Page
- Dark theme s červenými akcenty (admin branding)
- Form validace s react-hook-form
- Loading states a error handling
- Password visibility toggle
- Link na forgot password

### Admin TopBar
- Zobrazení přihlášeného uživatele
- Role badge (Super Admin)
- gc_super_admins group badge
- Logout tlačítko v profile dropdown
- Notifikace a emergency actions

### Protected Areas
- Loading spinner během ověřování
- Automatický redirect při vypršení session
- Unauthorized page pro uživatele bez oprávnění

## 🧪 Testování

### 1. Test úspěšného přihlášení
```bash
# Použijte účet který je členem gc_super_admins
Email: admin@gavlikcapital.com
Password: [váš-password]
```

### 2. Test neautorizovaného přístupu
```bash
# Použijte účet který NENÍ členem gc_super_admins
# Měli byste vidět: "Access denied. You must be a member of gc_super_admins group."
```

### 3. Test session expiration
```bash
# Počkejte 1 hodinu nebo upravte token expiration
# Měl by se automaticky refreshnout nebo redirect na login
```

### 4. Test logout
```bash
# Klikněte na profile dropdown → Odhlásit se
# Měli byste být přesměrováni na /admin/login
```

## 📝 Checklist pro produkci

- [ ] Změnit cookie settings na `secure: true` v produkci
- [ ] Implementovat CSRF protection
- [ ] Přidat rate limiting na login attempts
- [ ] Implementovat session timeout warning
- [ ] Přidat 2FA podporu (MFA)
- [ ] Implementovat audit logging
- [ ] Přidat error boundary komponenty
- [ ] Optimalizovat bundle size (lazy loading)
- [ ] Přidat PWA support pro offline
- [ ] Implementovat biometric authentication

## ❌ Troubleshooting

### "Missing required environment variables"
```bash
# Zkontrolujte .env.local
# Všechny NEXT_PUBLIC_ proměnné musí být nastavené
```

### "Access denied" při správných credentials
```bash
# Ověřte že je uživatel ve skupině gc_super_admins
aws cognito-idp admin-list-groups-for-user \
  --user-pool-id [POOL_ID] \
  --username [EMAIL]
```

### "Invalid or expired token"
```bash
# Token vyprší po 1 hodině
# Měl by se automaticky refreshnout
# Pokud ne, zkuste logout a login znovu
```

### CORS errors
```bash
# Backend musí povolit frontend origin
# Zkontrolujte CORS_ORIGIN v backend .env
CORS_ORIGIN=http://localhost:3000
```

## 🔄 Další kroky

1. **Implementovat další admin funkce**
   - User management UI
   - Dividend distribution forms
   - Analytics dashboards
   - Smart contract management

2. **Vylepšit UX**
   - Remember me checkbox
   - Session timeout warning modal
   - Better error messages
   - Loading skeletons

3. **Security enhancements**
   - Implement CSP headers
   - Add request signing
   - Implement device fingerprinting
   - Add login attempt monitoring

## 📞 Podpora

Pokud narazíte na problémy:
1. Zkontrolujte browser console pro errory
2. Ověřte network tab pro API calls
3. Zkontrolujte že backend běží na správném portu
4. Ověřte AWS Cognito nastavení

## 🎉 Hotovo!

Frontend je nyní plně integrován s AWS Cognito autentizací. Pouze členové skupiny `gc_super_admins` mají přístup do admin dashboardu.
