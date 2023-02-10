import classNames from "classnames";
import './tmdb-input.scss';

export enum InputTypes {
    email = 'email',
    password = 'password',
    file = 'file'
}

interface TmdbInputProps {
    type: InputTypes,
    placeholder?: string,
    id?: string,
    label?: string,
    isHiddenInput?: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TmdbInput(props: TmdbInputProps) {
    const labelClasses = classNames(
        { 'hidden-input-label': props.isHiddenInput }
    )
    return (
        <>
            {(props.label || (props.isHiddenInput && !props.label)) && <label className={labelClasses} htmlFor='tmdb-input'>{props.label}</label>}
            <input
                className='tmdb-input'
                type={props.type}
                placeholder={props.placeholder}
                onChange={props.onChange}
                id={props.isHiddenInput ? 'tmdb-input' : props.id}
                hidden={props.isHiddenInput}
            />
        </>
    )
}

export default TmdbInput