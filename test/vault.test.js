const expect = require("chai").expect;
const geodist = require("geodist");
const moment = require("moment");

describe("Vault Tests", () => {
  describe("Reverse Array", () => {
    it("should turn the below string into an array and reverse the words", () => {
      let array = "I want this job";
      reverseArray = data => {
        dataArray = data.split(" ");
        newArray = [];
        for (let i = dataArray.length - 1; i >= 0; i--) {
          newArray.push(dataArray[i]);
        }
        return newArray;
      };
      data=reverseArray(array);
      expect(["job", "this", "want", "I"]).to.deep.equal(data);
    });
  });

  describe("Order Array", () => {
    it("should sort the below array", () => {
      let dataSet = ["200", "450", "2.5", "1", "505.5", "2"];
      orderArray = data => {
        data = data.map(n => parseFloat(n));
        data.sort();
        return data;
      };
      data= orderArray(dataSet);
      expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(data);
    });
  });

  describe("Get Diff Array", () => {
    it("should determine array differences", () => {
      let data1 = [1, 2, 3, 4, 5, 6, 7];
      let data2 = [2, 4, 5, 7, 8, 9, 10];

      getArrayDiff = (data1, data2) => {
        const data = [];

        for (let i = 0; i < data2.length; i++) {
          let inArray = false;
          for (let j = 0; j < data1.length; j++) {
            if (data2[i] === data1[j]) {
              inArray = true;
            }
          }
          if (!inArray) {
            data.push(data2[i]);
          }
        }
        return data;
      };
      let data= getArrayDiff(data1, data2);

      expect([8, 9, 10]).to.deep.equal(data);
      data= getArrayDiff(data2, data1);
      expect([1, 3, 6]).to.deep.equal(data);
    });
  });

  describe("Get Distance", () => {
    it("should get the distance between two geo points", () => {
      let place1 = {
        lat: "41.9641684",
        lon: "-87.6859726"
      };

      let place2 = {
        lat: "42.1820210",
        lon: "-88.3429465"
      };
      //geodist uses the haversine formula to find the distance between two
      //points on a sphere
      getDistance = (place1, place2) => {
        parseFloat(place1.lat);
        parseFloat(place1.lon);
        parseFloat(place2.lat);
        parseFloat(place2.lon);
        let distance = geodist(place1, place2, { exact: true });
        distance = (Math.trunc(distance * 100) / 100).toString();
        return distance;
      };
      let distance= getDistance(place1, place2)
      expect(distance).to.equal("36.91");
    });
  });

  describe("Get Human Time Diff", () => {
    it("should generate a human readable time difference", () => {
      let time1 = "2016-06-05T12:00:00";
      let time2 = "2016-06-05T15:00:00";

      getTimeDiff = (time1, time2) => {
        let t1 = moment(time1);
        let t2 = moment(time2);
        let timeDiff = t2.diff(t1);

        let duration = moment.duration(timeDiff);
        yearsDiff = duration.years();
        monthsDiff = duration.months();
        daysDiff = duration.days();
        hoursDiff = duration.hours();
        minutesDiff = duration.minutes();
        secondsDiff = duration.seconds();
        timeDiff = yearsDiff ? yearsDiff + " years ago " : "";
        timeDiff += monthsDiff ? monthsDiff + " months ago " : "";
        timeDiff += daysDiff ? daysDiff + " days ago " : "";
        timeDiff += hoursDiff ? hoursDiff + " hours ago" : "";
        timeDiff += minutesDiff ? minutesDiff + " minutes ago" : "";
        timeDiff += secondsDiff ? secondsDiff + " seconds ago" : "";
        return timeDiff;
      };
      timeDiff = getTimeDiff(time1, time2)

      expect(timeDiff).to.equal("3 hours ago");
    });
  });
});
