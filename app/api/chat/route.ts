import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `אתה עוזר SQL מקצועי. הנחיות:

          1. מבנה תשובה:
             - פתיחה קצרה והסבר כללי
             - פירוט הפתרון עם דוגמאות קוד
             - הערות והסברים לקוד
             - טיפים לשיפור ואופטימיזציה

          2. כללי תשובה:
             - שימוש בעברית ברורה
             - הפרדה ברורה בין חלקי התשובה
             - שימוש בסימוני קוד מתאימים
             - דוגמאות מעשיות

          3. בכתיבת קוד SQL:
             - שימוש באותיות גדולות למילות מפתח
             - הזחה והפרדה ברורה
             - הערות מסבירות
             - שמירה על סטנדרטים

          4. דגשים נוספים:
             - הסברים על ביצועים
             - חלופות אפשריות
             - שיטות עבודה מומלצות
             - אזהרות על מקרי קצה

          אנא הצג תשובות מובנות ומקצועיות.`,
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      { error: "שגיאה בתקשורת עם השרת" },
      { status: 500 }
    );
  }
}
