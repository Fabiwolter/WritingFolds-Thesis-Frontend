import Link from 'next/link'
import moment from 'moment'

const StoryPartClassic = ({part, deletePartButton, iterator}) => {
    return (
        <div className="collapsible">
            <input id={`collapsible` + (iterator+2)} type="checkbox" name="collapsible" />
            <label style={{fontWeight: 300}} htmlFor={`collapsible` + (iterator+2)}>
                <p className="margin-none" style={{textAlign: "justify"}}>
                    {part.body}
                </p>
            </label>
            <div className="collapsible-body">
                <span className="">
                    <div className="row margin-none flex-edges">
                        <p className="article-meta margin-none">
                            Written by <Link href={`/profile/${part.postedBy.username}`}>
                        <a>{part.postedBy.name}</a>
                        </Link> {moment(part.updatedAt).fromNow()}
                        </p>
                        {deletePartButton(part)}
                    </div>
                </span>
            </div>
        </div>
    )
}

export default StoryPartClassic