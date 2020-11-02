import Link from 'next/link'
import moment from 'moment'

const StoryPartWritingPrompt = ({part, deletePartButton}) => {
    return (
        <div className="paper margin-bottom-large margin-top-large">
            <p className="margin-none" style={{textAlign: "justify"}}>
                {part.body}
            </p>
            <div>
                <span>
                    <div className="row margin-none flex-edges">
                        {deletePartButton(part)}
                        <p className="article-meta" style={{textAlign: "right"}}>
                            Written by <Link href={`/profile/${part.postedBy.username}`}>
                        <a>{part.postedBy.name}</a>
                        </Link> {moment(part.updatedAt).fromNow()}
                        </p>
                    </div>
                </span>
            </div>
        </div>
    )
}

export default StoryPartWritingPrompt