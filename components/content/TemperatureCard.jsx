export function TemperatureCard({ title, rows, note }) {
  return (
    <div className="relative px-4 py-10 md:px-10 md:py-12">
      <img src="/hero/sky.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="relative mx-auto max-w-md bg-paper/95 px-6 pb-6 pt-7 md:px-8">
        <h2 className="text-center font-display text-2xl font-medium uppercase tracking-[0.14em] text-ink md:text-[28px]">
          {title}
        </h2>
        <dl className="mt-3">
          {rows.map((row) => (
            <div key={row.name} className="flex items-baseline justify-between border-b border-bamboo/60 py-3">
              <dt className="text-base font-normal">{row.name}</dt>
              <dd className="font-display text-[22px] md:text-2xl">{row.temp}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-center font-script text-[26px] leading-tight text-matcha md:text-3xl">{note}</p>
      </div>
    </div>
  );
}
