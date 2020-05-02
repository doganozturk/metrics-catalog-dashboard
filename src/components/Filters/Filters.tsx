import * as React from "react";
import "./Filters.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IProps {
    dateMin: Date | null;
    dateMax: Date | null;
    setDateMin: (date: Date | null) => void;
    setDateMax: (date: Date | null) => void;
}

const Filters: React.FC<IProps> = ({
    dateMin,
    dateMax,
    setDateMin,
    setDateMax,
}) => {
    const [last30Minutes, setLast30Minutes] = React.useState<boolean>(true);

    const onInputChange = () => {
        const now = new Date();
        const nowMinus30 = new Date(now.getTime() - 30 * 60000);

        setLast30Minutes(!last30Minutes);

        if (!last30Minutes) {
            setDateMin(nowMinus30);
            setDateMax(now);
        }
    };

    return (
        <div className="Filters">
            <div className="filter">
                <label>
                    <input
                        type="checkbox"
                        checked={last30Minutes}
                        onChange={onInputChange}
                    />
                    Last 30 minutes
                </label>
            </div>
            <div className="filter">
                <DatePicker
                    selected={dateMin}
                    onChange={(date) => setDateMin(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
            </div>
            <div className="filter">
                <DatePicker
                    selected={dateMax}
                    onChange={(date) => setDateMax(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
            </div>
        </div>
    );
};

export default Filters;
