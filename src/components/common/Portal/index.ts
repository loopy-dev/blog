import dynamic from 'next/dynamic';
import type { Props } from './Portal';

// Portal only can be showed on browser, not a server.
const Portal = dynamic<Props>(() => import('./Portal'), { ssr: false });
export default Portal;
