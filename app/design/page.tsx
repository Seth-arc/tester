'use client'

import { Layout } from '../../components/layout'
import { ModuleDesign } from '../../components/module-design'
import toast from 'react-hot-toast'

export default function Design() {
  const handleDesignComplete = () => {
    toast.success("Module design completed successfully!")
  }

  return (
    <Layout>
      <ModuleDesign onComplete={handleDesignComplete} />
    </Layout>
  )
}
