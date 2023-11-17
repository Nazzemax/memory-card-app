import ReactSlider from "react-slider";
import "./Slider.scss";
import { debounce } from "../../utils/Debounce";

const Slider: React.FC<{
  min: number;
  max: number;
  onSliderChange:(num:number[]) => void
}> = ({ min, max, onSliderChange }) => {
  
  const debouncedHandleSliderChange = debounce(onSliderChange, 400); // Adjust the delay as needed

  return (
    <>
      <div className="flex flex-col">
        <p className="mb-2 text-sm font-medium">Number of cards</p>

        <div className="flex items-center space-x-4">
          <div className="p-2 text-center border font-semibold text-base self-center">
            {min}
          </div>

          <ReactSlider
            minDistance={1}
            className="slider"
            value={[min,max]}
            onChange={debouncedHandleSliderChange}
            ariaLabel={["Lower thumb", "Upper thumb"]}
            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
            renderThumb={(props) => (
              <div {...props}>
                <span className="flex bottom-1 bg-white rounded-2xl absolute right-[0.24rem] top-[0.28rem] w-2 h-2 z-50"></span>
              </div>
            )}
          />
          <div className="p-2 text-center border font-semibold text-base">
            {max}
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
