import './tmdb-input.scss';

export enum InputTypes {
    email = 'email',
    password = 'password'
}

interface TmdbInputProps {
    type: InputTypes,
    placeholder?: string,
    id?: string,
    label?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TmdbInput(props: TmdbInputProps) {
    return (
        <>
            {props.label && <label>{props.label}</label>}
            <input
                className='tmdb-input'
                type={props.type}
                placeholder={props.placeholder}
                onChange={props.onChange}
                id={props.id}
            />
        </>
    )
}

export default TmdbInput