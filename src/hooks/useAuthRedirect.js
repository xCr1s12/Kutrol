import { useRouter } from 'next/navigation' 

export const useHookNavigation = () => {
  const router = useRouter()

  const handleRedirect = (route) => {
    /* Espacio para validacion o auth */

    router.push(route)
  }

  
  return { handleRedirect }
}