'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CertificateData {
  title: string
  dateRange: string
  subtitle1: string
  subtitle2: string
  totalParticipants: string
  successfulChallenges: string
  completionRate: string
  fullTimeParticipants: string
  names: string
  footerText: string
}

const defaultData: CertificateData = {
  title: 'ZK共学',
  dateRange: '24.07.29-08.18',
  subtitle1: '残酷',
  subtitle2: '结营',
  totalParticipants: '54',
  successfulChallenges: '8',
  completionRate: '14.8',
  fullTimeParticipants: '2',
  names: 'Draculabo\nYiyanwannian\nOscar\nxiaodongQ\nliujianyu2022\nZemmer\nbtou\nspn',
  footerText: '本期完成残酷共学的伙伴将获得由 LXDAO 颁发的徽章'
}

export function CertificateGeneratorComponent() {
  const [data, setData] = useState<CertificateData>(defaultData)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 1000

    // Draw background
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw gradient circle
    const gradient = ctx.createRadialGradient(400, 500, 0, 400, 500, 400)
    gradient.addColorStop(0, '#00ffff')
    gradient.addColorStop(1, '#0080ff')
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(400, 500, 350, 0, Math.PI * 2)
    ctx.fill()

    // Draw text
    ctx.fillStyle = 'white'
    ctx.font = 'bold 40px Arial'
    ctx.fillText(`${data.title} (${data.dateRange})`, 50, 100)

    ctx.font = 'bold 60px Arial'
    ctx.fillText(`${data.subtitle1} ${data.subtitle2}`, 50, 180)

    ctx.font = '30px Arial'
    ctx.fillText(`本期共学伙伴：${data.totalParticipants} 人`, 50, 300)
    ctx.fillText(`挑战成功：${data.successfulChallenges} 人`, 50, 350)
    ctx.fillText(`完成率：${data.completionRate} %`, 50, 400)
    ctx.fillText(`全勤超残酷：${data.fullTimeParticipants} 人`, 50, 450)

    // Draw names
    ctx.font = '24px Arial'
    const nameList = data.names.split('\n')
    nameList.forEach((name, index) => {
      ctx.fillText(name.trim(), 500, 300 + index * 40)
    })

    // Draw footer
    ctx.font = '18px Arial'
    ctx.fillText(data.footerText, 50, 950)
  }

  const downloadImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dataUrl = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = 'lxdao_certificate.png'
    link.click()
  }

  useEffect(() => {
    generateImage()
  }, [data])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setData(prevData => ({ ...prevData, [name]: value }))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">LXDAO Intensive Co-learning Certificate Generator</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
            {key === 'names' ? (
              <Textarea
                id={key}
                name={key}
                value={value}
                onChange={handleInputChange}
                rows={8}
              />
            ) : (
              <Input
                id={key}
                name={key}
                value={value}
                onChange={handleInputChange}
              />
            )}
          </div>
        ))}
      </div>
      <Button onClick={downloadImage} className="mb-4">Generate and Download Image</Button>
      <canvas ref={canvasRef} className="border border-gray-300"></canvas>
    </div>
  )
}