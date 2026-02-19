import { useEffect, useRef, useState } from 'react'
import * as poseDetection from '@tensorflow-models/pose-detection'
import * as tf from '@tensorflow/tfjs'

export function usePoseDetection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [postureScore, setPostureScore] = useState(1)

  useEffect(() => {
    let animationId: number
    let detector: poseDetection.PoseDetector

    const setup = async () => {
      // 1. カメラ取得
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (!videoRef.current) return
      videoRef.current.srcObject = stream
      await videoRef.current.play()

      // 2. MoveNet 初期化
      await tf.ready()
      detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet
      )

      // 3. 毎フレームループ
      const loop = async () => {
        if (!videoRef.current) return

        const poses = await detector.estimatePoses(videoRef.current)
        const keypoints = poses[0]?.keypoints

        if (keypoints) {
          const nose = keypoints[0]
          const leftShoulder = keypoints[5]
          const rightShoulder = keypoints[6]

          // 4. スコア計算
          const shoulderMidY = (leftShoulder.y + rightShoulder.y) / 2
          const diff = shoulderMidY - nose.y
          const score = Math.min(1, Math.max(0, diff / 150))
          setPostureScore(score)
        }

        animationId = requestAnimationFrame(loop)
      }

      loop()
    }

    setup()

    return () => {
      cancelAnimationFrame(animationId)
      detector?.dispose()
    }
  }, [])

  return { videoRef, postureScore }
}