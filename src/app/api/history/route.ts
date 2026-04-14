import { dbAll } from '@/lib/db';

export async function GET() {
  const rows = await dbAll<Record<string, unknown>>(
    'SELECT * FROM history ORDER BY created_at DESC LIMIT 100'
  );

  const history = rows.map((row) => ({
    ...row,
    input_cuts: JSON.parse(row.input_cuts as string),
    output_results: JSON.parse(row.output_results as string),
  }));

  return Response.json(history);
}
