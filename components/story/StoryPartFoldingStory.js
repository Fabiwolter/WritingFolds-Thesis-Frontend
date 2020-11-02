import Link from 'next/link'
import moment from 'moment'

const StoryPartFoldingStory = ({part, deletePartButton, iterator, partsLength}) => {
    return (
        <div>
            <div className="folded-amount-badge">
                <p popover-top="Only when this Story is finished, or Game Mode is changed, all the added Parts will be readable">
                    <span className="badge">{partsLength-1} x folded</span>
                </p>
            </div>
            <div key={iterator} className="collapsible letter padding-small">
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
        </div>
    )
}

export default StoryPartFoldingStory