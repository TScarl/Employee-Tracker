INSERT INTO department (name)
VALUES
('Management'),
('Customer service'),
('Maintenance'),
('Cleaning'),
('Receptionist');

-- PREVENTS REPLICATIONS
DELETE r
FROM department r
LEFT JOIN (
  SELECT MIN(id) as id, name
  FROM department
  GROUP BY name
) r2 ON r.id = r2.id
WHERE r2.id IS NULL;

INSERT INTO role (title, salary, department_id)
VALUES
('Bartender', 50000, 2),
('kitchen hand', 50000, 2),
('Cleaner', 50000, 4),
('Maintenance officer', 65000, 3),
('Receptionist', 60000, 5),
('Manager', 100000, 1);

DELETE r
FROM role r
LEFT JOIN (
  SELECT MIN(id) as id, title, salary, department_id
  FROM role
  GROUP BY title, salary, department_id
) r2 ON r.id = r2.id
WHERE r2.id IS NULL;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Charles', 'King', 1, NULL),
('Emily', 'Brown', 1, NULL),
('James', 'Stovin', 2, 1),
('Kyle', 'Smith', 2, 1),
('Louie', 'Harrington', 5, 2),
('Emma', 'Boyle', 4, 2),
('Tegan', 'Cleaner', 4, 2),
('Mike', 'Layman', 3, 1),
('Jimmy', 'Blows', 2, 1),
('Harry', 'Freud', 3, 1),
('Meg', 'Griffin', 4, 2),
('Lancelot', 'Boyle', 2, 1);

DELETE r
FROM employee r
LEFT JOIN (
  SELECT MIN(id) as id, first_name, last_name, role_id, manager_id
  FROM employee
  GROUP BY first_name, last_name, role_id, manager_id
) r2 ON r.id = r2.id
WHERE r2.id IS NULL;


-- creates a table which shows review id, movie_name and the review.
-- SELECT reviews.id, movies.movie_name, reviews.review
-- FROM reviews
-- JOIN movies ON reviews.movie_id = movies.id;

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;