import Link from 'next/link'
import {gameModeNumberToString} from '../../helperMethods/gameModeHelper'

const GameModeTag = ({game_mode}) => (
    game_mode === 1 &&
    <Link href={`/gameModes/${game_mode}`}>
        <a className="paper-btn btn-secondary-outline btn-small mr-1 ml-1">{gameModeNumberToString(game_mode)}</a>
    </Link> ||
    game_mode === 2 &&
    <Link href={`/gameModes/${game_mode}`}>
        <a className="paper-btn btn-success-outline btn-small mr-1 ml-1">{gameModeNumberToString(game_mode)}</a>
    </Link>
)

export default GameModeTag