import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function NotFoundPage() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/home/main')
  }, [])

  return null
}
