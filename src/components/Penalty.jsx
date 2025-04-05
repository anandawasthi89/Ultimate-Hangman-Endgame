export function Penalty({ value,dead }) {
    const Styles={textDecoration: dead?"line-through":""}
    return (
            <span className="penalty" style={Styles} >{value}</span>
    )
}