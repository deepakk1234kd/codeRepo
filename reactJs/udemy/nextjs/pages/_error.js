import React from 'react';
import Link from 'next/link';
    
const errorPage = (props) => (
    <div>
        <h1>Something has gone wrong man</h1>
        <p>Try <Link href="/"><a>Going back</a></Link></p>
    </div>
);
    
export default errorPage;