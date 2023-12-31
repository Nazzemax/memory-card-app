
const loader:React.FC<{h:string}> = ({h}):React.JSX.Element => {
  return (
<div className={`flex items-center justify-center ${h}`}>
  <div className="inline-block m-12 h-12 w-12 animate-spin rounded-full 
  border-4 border-solid border-current border-r-transparent">
    <span className="absolute -m-px h-px w-px overflow-hidden
     whitespace-nowrap border-0 p-0 clip-[rect(0,0,0,0)]">
      Loading...
    </span>
  </div>
</div>

)
}

export default loader;