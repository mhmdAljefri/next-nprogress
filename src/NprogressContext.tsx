import React from 'react'
import Router from "next/router"
import NProgress, { NProgressOptions } from "nprogress"
import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react"
import NProgressStyle, { Props as NProgressStyleProps } from "./Nprogress.style"

type Options = NProgressOptions & {
  startPosition?: number
  stopDelay?: number
  /** @default "#29d" */
  color?: NProgressStyleProps['color']
  /** @default "2px" */
  barHeight?: NProgressStyleProps['barHeight']
}

type ProgressContextType = { updateOptions: (options: Partial<Options>) => void }

type Props = {
  children?: ReactNode
  configurationOptions?: Partial<Options>
}

const ProgressContext = createContext<ProgressContextType>({
  updateOptions: () => {},
})

let timer: NodeJS.Timeout

const NextjsNProgress: FC<Props> = ({ configurationOptions, children }) => {
  const [options, setOptions] = useState(configurationOptions)

  const updateOptions: ProgressContextType["updateOptions"] = (opts) =>
    setOptions((state) => ({ ...state, ...opts }))

  useEffect(() => {
    const { stopDelay = 200, startPosition } = options || {}

    const handleRouteChangeStart = () => {
      if (startPosition) NProgress.set(startPosition)
      console.log("start")
      NProgress.start()
    }

    const handleRouteChangeEnd = () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        NProgress.done(true)
      }, stopDelay)
    }

    const handleRouteChangeError = () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        NProgress.done(true)
      }, stopDelay)
    }

    if (options) {
      NProgress.configure(options)
    }

    Router.events.on("routeChangeStart", handleRouteChangeStart)
    Router.events.on("routeChangeComplete", handleRouteChangeEnd)
    Router.events.on("routeChangeError", handleRouteChangeError)

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart)
      Router.events.off("routeChangeComplete", handleRouteChangeEnd)
      Router.events.off("routeChangeError", handleRouteChangeError)
    }
  }, [options])

  return (
    <ProgressContext.Provider
      value={{
        updateOptions,
      }}
    >
      {children}
      <NProgressStyle color={options?.color || "#29d"} barHeight={options?.barHeight || "2px"} />
    </ProgressContext.Provider>
  )
}

export const useUpdateProgressConfig = () => useContext(ProgressContext).updateOptions

export default NextjsNProgress
