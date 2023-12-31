import { config } from '@/app.config'
import RemoteServerLogo from './remote/remote-logo-server'

const YZ13Mark = () => {
    return (
        <div className="flex items-center gap-2 w-fit h-fit">
            <div className="w-fit h-fit items-center gap-2 sm:flex hidden">
                <RemoteServerLogo dark={config.remote.logo.dark} light={config.remote.logo.light} size={24} alt="dm-logo" />
                <span className="text-xl text-muted-foreground">\</span>
            </div>
            <h1 className="text-xl font-semibold text-center text-accent-foreground">YZ13</h1>
        </div>
    )
}

export default YZ13Mark