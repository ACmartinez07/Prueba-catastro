/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-html-link-for-pages */
import { useRouter } from 'next/router';
export default function layout() {
  const router = useRouter();

  return ( <
    div >
    <
    nav >
    <
    div >
    <
    ul >
    <
    li > < a href = "/" > Home < /a></li >
    <
    /ul> <
    /div> <
    /nav> <
    /div>
  )
}