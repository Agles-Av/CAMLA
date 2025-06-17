import React from 'react'
import {Spinner} from 'flowbite-react';

const SpinnerLazy = () => {
    return (
       <div className="flex flex-col gap-2">
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example"  />
      </div>
    </div>
    )
}

export default SpinnerLazy