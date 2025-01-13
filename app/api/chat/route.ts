import { openai } from "@/lib/openai";
import OpenAI from "openai";
const systemPrompt = `אתה עוזר SQL מקצועי. הנחיות למענה:

1. מבנה כללי:
   * תשובה בעברית ברורה
   * כתיבה מימין לשמאל
   * פיסוק נכון ורווחים
   * חלוקה לפסקאות ברורה

2. מבנה תשובה:
   # נושא השאלה
   תיאור קצר וממוקד

   ## הסבר כללי
   הסבר קצר וברור של המושג או הנושא

   ## דוגמת קוד
   \`\`\`sql
   -- הערה מסבירה
   SELECT column_name    -- שם העמודה
   FROM table_name      -- שם הטבלה
   WHERE condition;     -- תנאי הסינון
   \`\`\`

   ## הסבר מפורט
   * נקודה ראשונה
   * נקודה שנייה

   ## טיפים לשיפור
   * טיפ ראשון
   * טיפ שני

3. הדגשים לקוד SQL:
   * שימוש באותיות גדולות למילות מפתח (SELECT, FROM, WHERE...)
   * הזחה ברורה של שורות
   * הערות מסבירות ליד כל שורה
   * דוגמאות מעשיות ופשוטות

4. התאמות:
   * לדלג על חלקים לא רלוונטיים
   * להתאים את המבנה לסוג השאלה
   * לשמור על פורמט קוד אחיד`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4", // Changed from gpt-4o-mini as it's not a valid model
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.7,
      max_tokens: 2000,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    return Response.json(completion.choices[0].message);
  } catch (error) {
    console.error("OpenAI API Error:", error);

    if (error instanceof OpenAI.APIError) {
      const statusCode = error.status || 500;
      let message = "שגיאה בתקשורת עם השרת";

      switch (error.code) {
        case "rate_limit_exceeded":
          message = "חרגנו ממכסת הבקשות, אנא נסה שוב בעוד מספר דקות";
          break;
        case "invalid_request_error":
          message = "בקשה לא תקינה";
          break;
        case "context_length_exceeded":
          message = "השיחה ארוכה מדי, אנא התחל שיחה חדשה";
          break;
        default:
          message = `שגיאת API: ${error.message}`;
      }

      return Response.json({ error: message }, { status: statusCode });
    }

    return Response.json(
      { error: "שגיאה לא צפויה, אנא נסה שוב מאוחר יותר" },
      { status: 500 }
    );
  }
}
