# قلم - منصة التعليم العربي

منصة تعليمية شاملة مصممة خصيصًا للطلاب العرب، توفر أدوات تفاعلية وموارد تعليمية عالية الجودة.

## المتطلبات

- Node.js (الإصدار 18 أو أحدث)
- MongoDB (الإصدار 5.0 أو أحدث)
- npm أو yarn

## التثبيت والإعداد

### 1. استنساخ المشروع

```bash
git clone <repository-url>
cd qalam-education
```

### 2. تثبيت التبعيات

```bash
npm install
```

### 3. إعداد قاعدة البيانات

#### تثبيت MongoDB

**على Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

**على macOS (باستخدام Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

**على Windows:**
قم بتحميل وتثبيت MongoDB من الموقع الرسمي: https://www.mongodb.com/try/download/community

#### إنشاء قاعدة البيانات

```bash
# الاتصال بـ MongoDB
mongosh

# إنشاء قاعدة البيانات
use qalam-education

# إنشاء مستخدم مدير (اختياري)
db.createUser({
  user: "admin",
  pwd: "admin123",
  roles: ["readWrite", "dbAdmin"]
})
```

### 4. إعداد متغيرات البيئة

انسخ ملف `.env.example` إلى `.env` وقم بتحديث القيم:

```bash
cp .env.example .env
```

قم بتحرير ملف `.env`:

```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/qalam-education

# Application Configuration
VITE_APP_NAME=قلم - منصة التعليم العربي
VITE_APP_VERSION=1.0.0
```

### 5. تشغيل التطبيق

```bash
# تشغيل في وضع التطوير
npm run dev

# بناء للإنتاج
npm run build

# معاينة البناء
npm run preview
```

## هيكل قاعدة البيانات

### المجموعات (Collections)

#### Users
- معلومات المستخدمين والطلاب
- بيانات التعليم والاشتراكات
- إدارة الفترة التجريبية

#### Admins
- حسابات المديرين
- صلاحيات الوصول
- سجل تسجيل الدخول

#### Lessons
- محتوى الدروس
- الفيديوهات والوثائق
- التمارين والبطاقات التفاعلية

#### UserProgress
- تتبع تقدم الطلاب
- درجات التمارين
- وقت الدراسة

#### SavedLessons
- الدروس المحفوظة للمراجعة

## الميزات

### للطلاب
- فترة تجريبية مجانية لمدة 24 ساعة
- محتوى تعليمي شامل لجميع المستويات
- تمارين تفاعلية وبطاقات تعليمية
- تتبع التقدم والإحصائيات
- واجهة محسنة للهواتف المحمولة

### للمديرين
- إدارة المحتوى التعليمي
- إنشاء وتحرير الدروس
- تتبع المستخدمين والإحصائيات
- أدوات إدارة المنصة

## التقنيات المستخدمة

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with RTL support

## المساهمة

نرحب بالمساهمات! يرجى اتباع الخطوات التالية:

1. Fork المشروع
2. إنشاء فرع للميزة الجديدة (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى الفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## الدعم

للحصول على الدعم، يرجى التواصل معنا عبر:
- البريد الإلكتروني: support@qalam-education.com
- GitHub Issues: [إنشاء مشكلة جديدة](../../issues)