import { NextResponse } from 'next/server';

const GITHUB_API_BASE_URL = 'https://api.github.com';
const GITHUB_PAT = process.env.GITHUB_PAT;

export async function GET(request) {
  console.log('⟳ /api/github proxy hit');

  // reconstruct the GitHub URL
  const { pathname, searchParams } = new URL(request.url);
  const githubPath = pathname.replace(/^\/api\/github/, '');
  const targetUrl = `${GITHUB_API_BASE_URL}${githubPath}?${searchParams}`;

  console.log('→', targetUrl);

  const headers = { 'User-Agent': 'VSCode-Portfolio-App' };
  if (GITHUB_PAT) headers['Authorization'] = `token ${GITHUB_PAT}`;

  let githubResponse;
  try {
    githubResponse = await fetch(targetUrl, { headers, cache: 'no-store' });
  } catch (networkErr) {
    console.error('Network error to GitHub:', networkErr);
    return NextResponse.json(
      { message: 'Network error when contacting GitHub', detail: networkErr.message },
      { status: 502 }
    );
  }

  let payload;
  const contentType = githubResponse.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      payload = await githubResponse.json();
    } catch (parseErr) {
      const text = await githubResponse.text();
      console.error('Invalid JSON from GitHub:', text);
      return NextResponse.json(
        {
          message: 'Invalid JSON received from GitHub API',
          snippet: text.slice(0, 300),
        },
        { status: 502 }
      );
    }
  } else {
    // fallback for weird non-JSON responses
    const text = await githubResponse.text();
    console.error('Non-JSON from GitHub:', text);
    return NextResponse.json(
      {
        message: 'Expected JSON from GitHub API',
        snippet: text.slice(0, 300),
      },
      { status: 502 }
    );
  }

  if (!githubResponse.ok) {
    const msg = payload.message || githubResponse.statusText;
    console.warn('GitHub API error:', msg);
    return NextResponse.json(
      { message: `GitHub API error: ${msg}` },
      { status: githubResponse.status }
    );
  }

  // ONLY return the JSON payload, no extra headers
  return NextResponse.json(payload, { status: githubResponse.status });
}
