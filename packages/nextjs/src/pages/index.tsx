import Head from 'next/head'

import Nav from '@/components/nav'
import { useLibp2pContext } from '@/context/ctx'
import { useEffect, useState } from 'react'
import { connectToPeer, getPeerMultiaddrs } from '@/lib/libp2p'
import type { Multiaddr } from '@multiformats/multiaddr'

export default function Home() {
  const { libp2p } = useLibp2pContext()
  const [isConnected, setIsConnected] = useState(false)
  const [multiaddrs, setMultiaddrs] = useState<Multiaddr[]>()

  useEffect(() => {
    getPeerMultiaddrs(libp2p)(
      `12D3KooWBdmLJjhpgJ9KZgLM3f894ff9xyBfPvPjFNn7MKJpyrC2`,
    )
      .then((addrs) => {
        setMultiaddrs(addrs)
        console.log(addrs.map((addr) => addr.toString()))
        return connectToPeer(libp2p)(addrs)
      })
      .catch(() => {
        setIsConnected(false)
      })
  }, [setIsConnected, setMultiaddrs])

  return (
    <>
      <Head>
        <title>js-libp2p-nextjs-example</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-full">
        <Nav />
        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                Libp2p WebTransport Example
              </h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <ul>
                <li>PeerID: {libp2p.peerId.toString()}</li>
              </ul>
              {/* <pre>{libp2p.getPeers().map((peer) => peer.toString())}</pre> */}
            </div>
          </main>
        </div>
      </main>
    </>
  )
}