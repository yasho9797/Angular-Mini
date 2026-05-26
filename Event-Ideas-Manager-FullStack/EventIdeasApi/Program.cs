 var builder = WebApplication.CreateBuilder(args);

// 1. שורה קריטית: הוספת שירותי הקונטרולרים למערכת
builder.Services.AddControllers();

// 2. הגדרת CORS עבור אנגולר
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// 3. הפעלת הצינורות (Middleware) בסדר הנכון
app.UseCors("AllowAngular");
app.UseAuthorization();

// 4. שורה קריטית: מיפוי נתיבי ה-API לקונטרולרים
app.MapControllers();

app.Run();