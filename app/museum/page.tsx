import Recommendations from '@/components/recomended'
import Trending from '@/components/trending'
import VRPlaceVisit from '@/components/vrplacevisit'
import React from 'react'

function MUSEUM() {
  return (
    <div>
      <Trending/>
      <VRPlaceVisit/>
      <Recommendations/>
    </div>
  )
}

export default MUSEUM