'use client'
import { blog } from "@/api/blog"
import { Markdown } from "@/components/shared/markdown"
import Textarea from "@/components/shared/textarea"
import PostTemplate from "@/components/templates/post/post.template"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PartialDocPost, Post } from "@/types/post"
import { auth } from "@/utils/app"
import { DateTime } from "luxon"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { BiHide, BiLoaderAlt, BiShow } from "react-icons/bi"
import GroupPostAuthors from "../post/post-author-group"
import PostCategory from "./post-category"
import { categories } from "@/const/categories"

type Props = {
    preloadPost: PartialDocPost | null
    postId: string | undefined
}
const PostForm = ({ preloadPost, postId: providedPostId }: Props) => {
    const post = preloadPost
    const [user] = useAuthState(auth)
    const [name, setName] = useState<string>(post ? post.name : '')
    const [description, setDescription] = useState<string>(post && post.description ? post.description : '')
    const [preview, setPreview] = useState<boolean>(false)
    const [content, setContent] = useState<string>(post ? post.content : '')
    const [category, setCategory] = useState<string>(post && post.category ? post.category : categories[categories.length - 3])
    const [loading, setLoading] = useState<boolean>(false)
    const authors: string[] = useMemo(() => {
        return post ? post.authorsId : user ? [user.uid] : []
    },[post, user])
    const { push } = useRouter()
    const regEx = /[\w\[\]`!@#$%\^&*()={}:;<>+'-]*/g
    const nameIdRegExp = /[^a-zA-Z 0-9 -]+/g
    const postId = name
        .toLowerCase()
        .replace(nameIdRegExp,'')
        .replaceAll(' ', '-')
        .replaceAll('--', '-')

    const validPostName = regEx.test(name)
    const clearForm = () => {
        setName('')
        setPreview(false)
        setContent('')
        setDescription('')
    }
    const createPost = async() => {
        if (user) {
            setLoading(true)
            const post: Post = {
                name: name,
                authorsId: [user.uid],
                createdAt: DateTime.now().toSeconds(),
                description: description,
                content: content,
                category: category
            }
            if (preloadPost) {
                const targetPath = providedPostId
                delete preloadPost.doc_id
                const postForUpdate: Post = {
                    ...preloadPost,
                    ...post,
                    authorsId: preloadPost.authorsId,
                    createdAt: preloadPost.createdAt,
                    updatedAt: DateTime.now().toSeconds()
                }
                const isUpdated = await blog.updateOne(postId, postForUpdate)
                if (isUpdated) {
                    setLoading(false)
                    clearForm()
                    push(`/blog/${targetPath}`)
                } else setLoading(false)

            } else {
                const createdPost = await blog.addOne(postId, post)
                if (createdPost) {
                    setLoading(false)
                    clearForm()
                    push(`/blog/${createdPost.doc_id}`)
                } else setLoading(false)
            }
        }
    }
    return (
        <PostTemplate>
            <PostTemplate.HeaderWrapper>
                <PostTemplate.Header>
                    { process.env.NODE_ENV === 'development' ? <span className="text-muted-foreground">Пост будет доступен по id: {postId}</span> : <div></div> }
                    <div className="flex flex-col w-full gap-4 py-4">
                        <PostCategory category={category} setCategory={setCategory} />
                    </div>
                    <div className="flex flex-col w-full gap-4 pt-4 pb-12">
                        <Input placeholder='Введите название поста' disabled={!!post} value={name} onChange={ e => setName(e.target.value ) }
                        className="px-0 lg:text-5xl text-2xl font-semibold normal-case text-accent-foreground border-0 h-fit !ring-0"/>
                        <Textarea value={description} className="w-full lg:text-xl text-base font-light text-muted-foreground" 
                        onChange={ e => setDescription(e.target.value) } placeholder="Введите описание для поста"  />
                    </div>
                    <div className="flex items-center gap-2 w-fit h-fit">
                        <Button onClick={() => setPreview(!preview)} size='icon' variant={preview ? 'default' : 'outline'}>{ preview ? <BiHide /> : <BiShow />}</Button>
                        <Button disabled variant='outline'>Добавить соавторов</Button>
                        <Button onClick={createPost} disabled={loading || !name || !validPostName || !user} className="gap-2">
                            { loading && <BiLoaderAlt className='animate-spin' /> }
                            { post ? 'Обновить пост' : 'Опубликовать'}
                        </Button>
                    </div>
                </PostTemplate.Header>
            </PostTemplate.HeaderWrapper>
            <PostTemplate.Body>
                <PostTemplate.Side>
                    <span className='text-muted-foreground'>Под авторством</span>
                    <GroupPostAuthors authors={authors} asClient />
                </PostTemplate.Side>
                <PostTemplate.Separator />
                <PostTemplate.Content>
                {
                    preview
                    ? <Markdown pageMode>{content || '### Введите содержание поста'}</Markdown>
                    : <Textarea value={content} className="w-full" onChange={ e => setContent(e.target.value) } placeholder="Введите содержание поста"  />
                }
                </PostTemplate.Content>
            </PostTemplate.Body>
        </PostTemplate>
    )
}

export default PostForm