import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default ({ href, children, as, ariaLabel }) => {
    const router = useRouter()

    let className = children.props.className || ''
    if (router.pathname === href && !router.pathname.includes('[slug]') ) {
        className = `${className} is-active`
    }

    return <Link aria-label={ariaLabel} scroll={false} href={href} as={as}>{React.cloneElement(children, { className })}</Link>
}