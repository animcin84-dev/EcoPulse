'use client';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#F7FAF5', color: '#173126', fontFamily: 'system-ui, sans-serif' }}>
        <main style={{ minHeight: '100svh', display: 'grid', placeItems: 'center', padding: '32px' }}>
          <section role="alert" style={{ width: 'min(720px, 100%)' }}>
            <p style={{ color: '#2DAF5B', letterSpacing: '.12em', textTransform: 'uppercase', fontSize: '12px' }}>EcoPulse / connection interrupted</p>
            <h1 style={{ margin: '20px 0', fontSize: 'clamp(44px, 8vw, 88px)', lineHeight: .92, letterSpacing: '-.05em' }}>The connection was interrupted.</h1>
            <p style={{ maxWidth: '620px', lineHeight: 1.65, opacity: .8 }}>EcoPulse could not finish loading the application shell. Try again to reconnect.</p>
            <p lang="kk" style={{ maxWidth: '620px', lineHeight: 1.65, opacity: .8 }}>EcoPulse қолданба қабатын толық жүктей алмады. Байланысты қалпына келтіру үшін қайта көр.</p>
            <button type="button" onClick={reset} style={{ marginTop: '28px', minHeight: '48px', padding: '0 20px', border: 0, borderRadius: '10px', background: '#42D873', color: '#173126', font: 'inherit', fontWeight: 650, cursor: 'pointer' }}>
              Try again / <span lang="kk">Қайта көру</span> →
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
