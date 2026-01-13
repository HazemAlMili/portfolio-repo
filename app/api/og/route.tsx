import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters for dynamic content (optional)
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Hazem Al-Melli';
    const subtitle = searchParams.get('subtitle') || 'Front-End Developer & React Specialist';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000000',
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(74, 107, 138, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(74, 107, 138, 0.15) 0%, transparent 50%)',
            padding: '40px 80px',
            position: 'relative',
          }}
        >
          {/* Decorative Circuit Lines */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              display: 'flex',
            }}
          >
            {/* Top decorative line */}
            <div
              style={{
                position: 'absolute',
                top: '80px',
                left: '80px',
                right: '80px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #6b8caf, transparent)',
                display: 'flex',
              }}
            />
            {/* Bottom decorative line */}
            <div
              style={{
                position: 'absolute',
                bottom: '80px',
                left: '80px',
                right: '80px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #6b8caf, transparent)',
                display: 'flex',
              }}
            />
          </div>

          {/* Main Content Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: '24px',
              zIndex: 10,
            }}
          >
            {/* Name */}
            <div
              style={{
                fontSize: '72px',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '-0.02em',
                display: 'flex',
              }}
            >
              {title}
            </div>

            {/* Accent Line */}
            <div
              style={{
                width: '200px',
                height: '4px',
                background: 'linear-gradient(90deg, transparent, #ffffff, transparent)',
                borderRadius: '2px',
                display: 'flex',
              }}
            />

            {/* Subtitle */}
            <div
              style={{
                fontSize: '42px',
                fontWeight: 600,
                color: '#b0b0b0',
                letterSpacing: '0.02em',
                display: 'flex',
              }}
            >
              {subtitle}
            </div>

            {/* Tech Stack Badges */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                marginTop: '32px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {['React', 'Next.js', 'TypeScript', 'Tailwind CSS'].map((tech) => (
                <div
                  key={tech}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    fontSize: '24px',
                    fontWeight: 500,
                    color: '#ffffff',
                    display: 'flex',
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>

            {/* URL/Portfolio indicator */}
            <div
              style={{
                fontSize: '28px',
                color: '#808080',
                marginTop: '40px',
                display: 'flex',
              }}
            >
              hazemalmelli.vercel.app
            </div>
          </div>

          {/* Corner Decorations */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '40px',
              width: '60px',
              height: '60px',
              border: '3px solid rgba(255, 255, 255, 0.2)',
              borderRight: 'none',
              borderBottom: 'none',
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              width: '60px',
              height: '60px',
              border: '3px solid rgba(255, 255, 255, 0.2)',
              borderLeft: 'none',
              borderTop: 'none',
              display: 'flex',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}
