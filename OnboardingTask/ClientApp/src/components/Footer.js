import React from 'react'

let dt = new Date();

const Footer = () => (
    <div className="row">
        <div className="column"><footer id="footer"> &copy; {dt.getFullYear()} - Mary Rose Legaspi</footer></div>
    </div>
)

export default Footer