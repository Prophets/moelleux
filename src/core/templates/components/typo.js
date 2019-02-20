import {
    MjmlText
} from 'mjml-react';

export const H = ({size, mjClass, cssClass, ...otherProps}) => (
    <MjmlText mjClass={`${mjClass || ''} h${size}`} cssClass={`${cssClass || ''} h${size}`} {...otherProps} />
)


export const H1 = ({size, ...otherProps}) => <H size='1' {...otherProps}  />
export const H2 = ({size, ...otherProps}) => <H size='2' {...otherProps}  />
export const H3 = ({size, ...otherProps}) => <H size='3' {...otherProps}  />
export const H4 = ({size, ...otherProps}) => <H size='4' {...otherProps}  />

export const P = ({ mjClass, cssClass, ...otherProps}) => (
    <MjmlText mjClass={`${mjClass || ''} p`} cssClass={`${cssClass || ''} p`} {...otherProps} />
)
