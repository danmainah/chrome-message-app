import { useDispatch, useSelector } from 'react-redux';
import { setNotificationSound } from '../store';

const Options = () => {
    const dispatch = useDispatch();
    const playSound = useSelector((state) => state.messages.playSound);

    const handleTogglePlaySound = () => {
        dispatch(setNotificationSound(!playSound));
    }
    return (
        <div>
            <h1>Options</h1>
            <label>
                <input
                    type="checkbox"
                    checked={playSound}
                    onChange={handleTogglePlaySound}
                />
                Enable notification sound for high priority messages
            </label>
        </div>
    )
}

export default Options