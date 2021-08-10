import React from 'react'
import { useMachine } from '@xstate/react'
import { createMachine, assign } from 'xstate'
import { percentage, minutes, seconds } from './utils'

const videoMachine = createMachine({
  id: 'video',
  initial: 'loading',

  context: {
    video: null,
    duration: 0,
    elapsed: 0,
  },

  states: {
    loading: {
      on: {
        LOADED: {
          target: 'ready',
          actions: ['setVideo'],
        },
        FAIL: 'failure',
      },
    },
    ready: {
      initial: 'paused',
      states: {
        paused: {
          on: {
            PLAY: {
              target: 'playing',
              actions: 'playVideo',
            },
          },
        },
        playing: {
          on: {
            TIMING: {
              target: 'playing',
              actions: 'setElapsed',
            },
            PAUSE: {
              target: 'paused',
              actions: 'pauseVideo',
            },
            END: 'ended',
          },
        },
        ended: {
          on: {
            PLAY: {
              target: 'playing',
              actions: 'restartVideo',
            },
          },
        },
      },
    },
    failure: { type: 'final' },
  },
})

// Action functions
const setVideo = assign({
  video: (_context, event) => event.video,
  duration: (_context, event) => event.video.duration,
})

const setElapsed = assign({
  elapsed: (context, _event) => context.video.currentTime,
})

const playVideo = (context, _event) => {
  context.video.play()
}

const pauseVideo = (context, _event) => {
  context.video.pause()
}

const restartVideo = (context, _event) => {
  context.video.currentTime = 0
  context.video.play()
}

function App() {
  const ref = React.useRef(null)
  const [current, send] = useMachine(videoMachine, {
    actions: { setVideo, setElapsed, playVideo, pauseVideo, restartVideo },
  })

  const { elapsed, duration } = current.context
  // console.log(current.value)

  return (
    <div className='container'>
      <video
        ref={ref}
        controls
        onCanPlay={() => {
          send('LOADED', { video: ref.current })
        }}
        onTimeUpdate={() => {
          send('TIMING')
        }}
        onError={() => {
          send('FAIL')
        }}
        onEnded={() => {
          send('END')
        }}
      >
        <source src='/fox.mp4' type='video/mp4' />
      </video>

      <div>
        <ElapsedBar elapsed={elapsed} duration={duration} />
        <Buttons current={current} send={send} />
        <Timer elapsed={elapsed} duration={duration} />
      </div>
    </div>
  )
}

const Buttons = ({ current, send }) => {
  if (current.matches({ ready: 'playing' })) {
    return (
      <button
        onClick={() => {
          send('PAUSE')
        }}
      >
        Pause
      </button>
    )
  }

  return (
    <button
      onClick={() => {
        send('PLAY')
      }}
    >
      Play
    </button>
  )
}

const ElapsedBar = ({ elapsed, duration }) => (
  <div className='elapsed'>
    <div
      className='elapsed-bar'
      style={{ width: `${percentage(duration, elapsed)}%` }}
    />
  </div>
)

const Timer = ({ elapsed, duration }) => (
  <span className='timer'>
    {minutes(elapsed)}:{seconds(elapsed)} of {minutes(duration)}:
    {seconds(duration)}
  </span>
)

export default App
