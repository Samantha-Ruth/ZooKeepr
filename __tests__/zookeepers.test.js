const fs = require("fs");
const { filterByQuery, findById, createNewZookeeper, validateZookeeper, } = require("../lib/zookeepers");
const { zookeepers } = require("../data/zookeepers.json");

jest.mock('fs');
test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { name: "Henry", id: "2008" },
        zookeepers
      );

    expect(zookeeper.name).toBe("Henry");
    expect(zookeeper.id).toBe("2008");
});

test("filters zookeepers by Query", () => {
    const startingZooKeepers =  [
        {
          id: "2009",
          name: "May",
          age: 52,
          favoriteAnimal: "bear",
        },
        {
          id: "20010",
          name: "Maurice",
          age: 24,
          favoriteAnimal: "lemur",
        },
      ];

    const updatedZookeepers = filterByQuery({ age: 52 }, startingZooKeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("Finds by ID", () => {
    const startingZooKeepers =  [
        {
          id: "2009",
          name: "May",
          age: 52,
          favoriteAnimal: "bear",
        },
        {
          id: "20010",
          name: "Maurice",
          age: 24,
          favoriteAnimal: "lemur",
        },
      ];

    const result = findById("2009", startingZooKeepers);

    expect(result.name).toBe("May");
});

test("Validates Zookeeper", () => {
    const ZooKeeper = {
          id: "2009",
          name: "May",
          age: 52,
          favoriteAnimal: "bear",
        };

    const invalidZooKeeper = 
        {
          id: "2009",
          name: "May",
          age: "not a number",
          favoriteAnimal: "bear",
        };
    
        const result = validateZookeeper(ZooKeeper);
        const result2 = validateZookeeper(invalidZooKeeper);

        expect(result).toBe(true);
        expect(result2).toBe(false);
});