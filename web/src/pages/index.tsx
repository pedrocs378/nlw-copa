import { FormEvent, useState } from 'react'
import { GetStaticProps } from 'next'
import Image from 'next/image'

import { api } from '../lib/axios'

import { Logo } from '../components/logo'
import { Check } from '../components/check'

import appPreviewImg from '../assets/app-mobile-preview.png'
import usersAvatarExampleImg from '../assets/users-avatars.png'

type HomeProps = {
  poolCount: number
  guessCount: number
  userCount: number
}

export default function Home({ userCount, poolCount, guessCount }: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  async function handleCreatePool(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('/pools', {
        title: poolTitle,
      })

      setPoolTitle('')

      const code = response.data.code as string

      await navigator.clipboard.writeText(code)

      alert(
        `Bolão criado com sucesso, o código ${code} foi copiado para sua área de transferência`,
      )
    } catch {
      alert('Falha ao criar o bolão')
    }
  }

  return (
    <div className="max-w-[1124px] min-h-screen mx-auto px-2 grid grid-cols-2 gap-28 items-center">
      <main>
        <Logo />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarExampleImg} alt="" />

          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{userCount}</span> pessoas já
            estão usando
          </strong>
        </div>

        <form className="mt-10 flex gap-2" onSubmit={handleCreatePool}>
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            value={poolTitle}
            onChange={(event) => setPoolTitle(event.target.value)}
          />

          <button
            type="submit"
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center divide-x divide-gray-600 text-gray-100">
          <div className="flex-1 flex items-center gap-6">
            <Check />

            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="flex-1 flex items-center gap-6 pl-8">
            <Check />

            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Prévia da aplicação móvel sendo mostrada em dois celulares"
        quality={100}
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get('/pools/count'),
      api.get('/guesses/count'),
      api.get('/users/count'),
    ])

  return {
    revalidate: 60 * 20, // 20 minutes
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  }
}
