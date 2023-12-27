'use client'
import { ChangeEvent, DetailedHTMLProps, ElementRef, TextareaHTMLAttributes, useLayoutEffect, useRef } from 'react'

const defaultStyle: React.CSSProperties = {
    resize: 'none',
    outline: 'none',
    display: 'block',
    overflow: 'hidden',
    backgroundColor: 'transparent'
};
const Textarea = (props: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>) => {
    const ref = useRef<ElementRef<'textarea'>>(null);
    const resize = (textarea: HTMLTextAreaElement) => {
        textarea.style.height = "40px";
        const scrollHeight = textarea.scrollHeight;
        textarea.style.height = scrollHeight + "px";
    }
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (props.onChange) props.onChange(e)
        if (ref.current) resize(ref.current)
    }
    useLayoutEffect(() => {
        if (props.value && ref.current) resize(ref.current)
    },[props.value, ref])
    return (
        <textarea {...props} ref={ref} onChange={onChange} style={{...defaultStyle}} />
    )
}

export default Textarea