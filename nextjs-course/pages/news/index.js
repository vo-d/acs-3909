import { Fragment } from "react";
import Link from "next/link";
//our-domain.com/news/something-important

function NewsPage(){

    return (
        <Fragment>
            <h1>The News Page</h1>
            <ul>
                <li><Link href="/news/nextjs-is-a-great-framework">NextJS is a great framework</Link></li>
                <li>Something else</li>
            </ul>
        </Fragment>
    )
}

export default NewsPage;