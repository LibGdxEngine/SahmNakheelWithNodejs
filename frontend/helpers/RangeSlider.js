import { useState } from "react";
import styles from "./RangeSlider.module.css";

const RangeSlider = ({ onChange }) => {
  const [values, setValues] = useState([18, 75]);

  const handleRangeChange = (event) => {
    const [min, max] = values;

    const [from, to] =
      event.target.id === "fromSlider"
        ? [event.target.value, max]
        : [min, event.target.value];
    // Ensure that the two slider values do not overlap
    if (from >= to) {
      if (event.target.id === "fromSlider") {
        setValues([parseInt(to) - 10, parseInt(to)]);
      } else {
        setValues([parseInt(from), parseInt(from) + 10]);
      }
    } else {
      setValues([parseInt(from), parseInt(to)]);
    }
    onChange(`${values[0]}-${values[1]}`);
  };

  return (
    <div className={`${styles.range_container}`}>
      <div className={`${styles.sliders_control}`}>
        <input
          id="toSlider"
          className={`${styles.slider}`}
          type="range"
          value={values[1]}
          min="7"
          max="75"
          onChange={handleRangeChange}
        />

        <input
          className={`${styles.slider}`}
          type="range"
          id="fromSlider"
          value={values[0]}
          min="7"
          max="75"
          onChange={handleRangeChange}
        />
      </div>
      <div className={styles["form_control"]}>
        <div className={styles["form_control_container"]}>
          <span>{values[0]}</span>
        </div>
        <div className={styles["form_control_container"]}>
          <span>{values[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
