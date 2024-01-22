import Image from 'next/image'

const YZ13Mark = () => {
    return (
        <div className="flex items-center gap-2 w-fit h-fit">
            <div className="w-fit h-fit items-center gap-2 sm:flex hidden">
                <Image src={"https://cdn.darkmaterial.space/dm/icons/DM-dark.svg"} width={24} height={24} alt="dm-logo" />
                <span className="text-xl text-muted-foreground">\</span>
            </div>
            <h1 className="text-xl font-semibold text-center text-accent-foreground">YZ13</h1>
        </div>
    )
}

export default YZ13Mark