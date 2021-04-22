const pool = require('./db')

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Gooooo to 0.0.0.0:3000.');
  });

  // POST /reset
  app.post('/reset', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        // if there is no issue obtaining a connection, execute query
        connection.query('drop table if exists test_table', function (err, rows, fields) {
          if (err) {
            // if there is an error with the query, release the connection instance and log the error
            connection.release()
            logger.error("Problem dropping the table test_table: ", err);
            res.status(400).send('Problem dropping the table');
          }
          else {
            // if there is no error with the query, execute the next query and do not release the connection yet
            connection.query('CREATE TABLE `db`.`test_table` (`id` INT NOT NULL AUTO_INCREMENT, `value` VARCHAR(45), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);', function (err, rows, fields) {
              if (err) {
                // if there is an error with the query, release the connection instance and log the error
                connection.release()
                logger.error("Problem creating the table test_table: ", err);
                res.status(400).send('Problem creating the table');
              }
              else {
                // if there is no error with the query, release the connection instance
                connection.release()
                res.status(200).send('created the table');
              }
            });
          }
        });
      }
    });
  });

  // POST /multplynumber
  app.post('/multiplynumber', (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO `db`.`test_table` (`value`) VALUES(\'' + req.body.product + '\')', function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table');
          }
          else {
            res.status(200).send(`added ${req.body.product} to the table!`);
          }
        });
      }
    });
  });

  // GET /checkdb
  app.get('/values', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT value FROM `db`.`test_table`', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          }
          else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });


  // Alfred K
  app.post('/registerUser', (req, res) => {

    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO user (userName, password, type, firstName, lastName, email, contactInfo, aboutMe) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [
            req.body.userName,
            req.body.password,
            req.body.type,
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.contactInfo,
            req.body.aboutMe
          ],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem registering user: \n", err);
              res.status(400).send('Problem registering user');
            }
            else {
              res.status(200).send(`Registered ${req.body.userName}!`);
            }
          });
      }
    });
  });


  app.post('/loginUser', (req, res) => {

    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT EXISTS (SELECT * FROM user WHERE userName = ? AND password = ?), (SELECT userID AS result FROM user WHERE userName = ? AND password = ?) AS result',
          [
            req.body.userName,
            req.body.password,
            req.body.userName,
            req.body.password,
          ],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem logging in user: \n", err);
              res.status(400).send('Problem logging in user');
            }
            else if (!rows[0].result) {
              res.send('false');
            } else {
              res.status(200).send(rows[0].result.toString());
            }
          });
      }
    });
  });


  app.get('/users', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('SELECT * FROM user', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching users: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          }
          else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });

  app.get('/users/:userID', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('SELECT * FROM user WHERE userID = ?',
          [req.params.userID],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching users: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
      }
    });
  });

  app.put('/users/:userID', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('UPDATE user SET userName = ?, password = ?, type = ?, firstName = ?, lastName = ?, email = ?, contactInfo = ?, aboutMe =? WHERE userID = ?',
          [
            req.body.userName,
            req.body.password,
            req.body.type,
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.contactInfo,
            req.body.aboutMe,
            req.params.userID
          ],
          function (err, rows, fields) {
            connection.release();
            console.log(req.params);
            if (err) {
              logger.error("Error while fetching users: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
      }
    });
  });

  app.delete('/users/:userID', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('DELETE FROM user WHERE userID = ? AND userName = ? AND password = ?',
          [
            req.params.userID,
            req.body.userName,
            req.body.password
          ],
          function (err, rows, fields) {
            connection.release();
            console.log(req.params);
            if (err) {
              logger.error("Error while fetching users: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
      }
    });
  });

  // ===============================================================================================
  //Jonas Moros
  app.get('/projects/:userID', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('SELECT * FROM project WHERE userID = ?',[req.params.userID],
          function (err, rows, fields) {
            connection.release();
            console.log(req.params);
            if (err) {
              logger.error("Erros : \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
      }
    });
  });
  

  app.delete('/projects/:projectID', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('DELETE FROM project where projectID = ?',[req.params.projectID],
          function (err, rows, fields) {
            connection.release();
            console.log(req.params);
            if (err) {
              logger.error("Erros : \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
      }
    });
  });

  app.put('/project/edit', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('UPDATE project SET userID=?, projectName = ?, budget=?, description=?,category=?,photo=?,active=? WHERE projectID=?',
        [
          req.body.userID,
          req.body.projectName,
          req.body.budget,
          req.body.description,
          req.body.category,
          req.body.photo,
          req.body.active,
          req.body.projectID,
          
        
        
        ],
          function (err, rows, fields) {
            connection.release();
            console.log(req.params);
            if (err) {
              logger.error("Erros : \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
      }
    });
  });
  app.put('/project/changeActivate', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('UPDATE project SET active=? where userID=? AND postID=?',
        [
          req.body.active,
          req.body.userID,
          req.body.postID
        ],
          function (err, rows, fields) {
            connection.release();
            console.log(req.params);
            if (err) {
              logger.error("Erros : \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
      }
    });
  });

  app.post('/project/add', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('insert into project (userID,projectName,budget,description,category,photo,active) values (?,?,?,?,?,?,?)',
        [
          req.body.userID,
          req.body.projectName,
          req.body.budget,
          req.body.description,
          req.body.category,
          req.body.photo,
          req.body.active
        ],
          function (err, rows, fields) {
            connection.release();
            console.log(req.params);
            if (err) {
              logger.error("Erros : \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
      }
    });
  });


  app.put('/post/like/postID', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('UPDATE project SET likes=? where ratingID=?',
        [
          req.body.likes,
          req.body.ratingID
        ],
          function (err, rows, fields) {
            connection.release();
            console.log(req.params);
            if (err) {
              logger.error("Erros : \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
      }
    });
  });

  app.put('/post/like', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('UPDATE project SET likes=? where ratingID=?',
        [
          req.body.likes,
          req.body.ratingID
        ],
          function (err, rows, fields) {
            connection.release();
            console.log(req.params);
            if (err) {
              logger.error("Erros : \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
      }
    });
  });

  app.put('/post/dislike', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('UPDATE project SET dislikes=? where ratingID=?',
        [
          req.body.likes,
          req.body.ratingID
        ],
          function (err, rows, fields) {
            connection.release();
            console.log(req.params);
            if (err) {
              logger.error("Erros : \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
      }
    });
  });
  app.put('/post/dislike', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('UPDATE project SET dislikes=? where ratingID=?',
        [
          req.body.likes,
          req.body.ratingID
        ],
          function (err, rows, fields) {
            connection.release();
            console.log(req.params);
            if (err) {
              logger.error("Erros : \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
      }
    });
  });
//Report Post

app.get('/post', (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) {
      logger.error('Problem obtaining MySQL connection', err)
      res.status(400).send('Problem obtaining MySQL connection');
    }
    else {
      connection.query('select * from post',
      [
        req.body.likes,
        req.body.ratingID
      ],
        function (err, rows, fields) {
          connection.release();
          console.log(req.params);
          if (err) {
            logger.error("Erros : \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          }
          else {
            res.status(200).json({
              "data": rows
            });
          }
        });
    }
  });
});

app.get('/professional', (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) {
      logger.error('Problem obtaining MySQL connection', err)
      res.status(400).send('Problem obtaining MySQL connection');
    }
    else {
      connection.query('select userName,type,firstName,lastName,email,contactInfo,aboutMe from user where type="Professional"',
      [
        req.body.userName,
        req.body.type,
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.contactInfo,
        req.body.aboutMe
      ],
        function (err, rows, fields) {
          connection.release();
          console.log(req.params);
          if (err) {
            logger.error("Erros : \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          }
          else {
            res.status(200).json({
              "data": rows
            });
          }
        });
    }
  });
});


app.get('/message/:mailboxID', (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) {
      logger.error('Problem obtaining MySQL connection', err)
      res.status(400).send('Problem obtaining MySQL connection');
    }
    else {
      connection.query('select * from mail where mailboxID=?',
      [
        req.params.mailboxID
      ],
        function (err, rows, fields) {
          connection.release();
          console.log(req.params);
          if (err) {
            logger.error("Erros : \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          }
          else {
            res.status(200).json({
              "data": rows
            });
          }
        });
    }
  });
});


app.post('/message/send', (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) {
      logger.error('Problem obtaining MySQL connection', err)
      res.status(400).send('Problem obtaining MySQL connection');
    }
    else {
      connection.query('INSERT INTO mail (mailID,mailboxID,senderID,content) values (?,?,?,?)',
      [
        req.body.mailID,
        req.body.mailboxID,
        req.body.senderID,
        req.body.content
      ],
        function (err, rows, fields) {
          connection.release();
          console.log(req.params);
          if (err) {
            logger.error("Erros : \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          }
          else {
            res.status(200).json({
              "data": rows
            });
          }
        });
    }
  });
});

  // Wyatt Cronk
  app.get('/post/:postID', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('SELECT * FROM post WHERE postID = ?',
          [req.params.postID],
          function (err, rows, fields) {
            connection.release();
            console.log(req.params);
            if (err) {
              logger.error("Errors: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
      }
    });
  });

  app.get('/post', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('SELECT * FROM post',
          function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Errors: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
      }
    });
  });

  app.get('/projects', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('SELECT * FROM project',
          function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Errors: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
      }
    });
  });

  app.get('/postbyUser/:userID', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('SELECT * FROM post INNER JOIN projectPost ON post.postID = projectPost.postID WHERE userID = ?',
          [req.params.userID],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Errors: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
      }
    });
  });

  app.get('/mailboxByUserName/:userName', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('SELECT mailboxID FROM mailbox INNER JOIN user ON mailbox.userID = user.userID WHERE userName = ?',
          [req.params.userName],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Errors: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows[0]
              });
            }
          });
      }
    });
  });

  app.get('/comment/:postID', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('SELECT * FROM postComment WHERE postID = ?',
          [req.params.postID],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Errors: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
      }
    });
  });


  app.post('/post/add', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('INSERT INTO post(censored, content, createdAt) VALUES(0, ?, current_timestamp())',
          [
            req.body.content  
          ],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Errors: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows[0]
              });
            }
          });
      }
    });
  });

  app.post('/comment', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('INSERT INTO postComment(postID, userID, content, liked, created_at) VALUES(?, ?, ?, 0, current_timestamp())',
          [
            req.body.postID,
            req.body.userID,
            req.body.content
          ],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Errors: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows[0]
              });
            }
          });
      }
    });
  });

  app.get('/reply/:commmentID', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('SELECT * FROM commentReply WHERE commentID = ?',
          [req.params.commentID],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Errors: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
      }
    });
  });

  app.post('/reply', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else {
        connection.query('INSERT INTO commentReply(commentID, userID, content, liked, createdAt) VALUES(?, ?, ?, 0, current_timestamp())',
          [
            req.body.commentID,
            req.body.userID,
            req.body.content
          ],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Errors: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            }
            else {
              res.status(200).json({
                "data": rows[0]
              });
            }
          });
      }
    });
  });


}
