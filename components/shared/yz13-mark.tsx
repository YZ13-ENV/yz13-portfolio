import { config } from '@/app.config'
import RemoteLogo from './remote-logo'

const YZ13Mark = () => {
    return (
        <div className="flex items-center gap-2 w-fit h-fit">
            <RemoteLogo dark={config.remote.logo.dark} light={config.remote.logo.light} size={24} alt="dm-logo" />
            <span className="text-xl text-muted-foreground">\</span>
            <h1 className="text-xl font-semibold text-center text-accent-foreground">YZ13</h1>
        </div>
    )
}

export default YZ13Mark