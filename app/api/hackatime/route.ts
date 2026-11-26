type TodayResponse = {
  data: { grand_total: { total_seconds: number; text: string } };
};

export async function GET() {
  const res = await fetch(
    "https://hackatime.hackclub.com/api/hackatime/v1/users/current/statusbar/today",
    {
      headers: { Authorization: `Bearer ${process.env.HACKATIME_API_KEY}` },
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) {
    return Response.json({ error: "hackatime unreachable" }, { status: 502 });
  }

  const json: TodayResponse = await res.json();
  return Response.json({ seconds: json.data.grand_total.total_seconds });
}
