import React from "react";
import { CardGroup, Card } from "react-bootstrap";
import subMonths from "date-fns/subMonths";
import compareAsc from "date-fns/compareAsc";
import formatDistance from "date-fns/formatDistance";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import format from "date-fns/format";
import subDays from "date-fns/subDays";

const customCardX = ({ data, filter, dateValue }) => {
  return (
    <div>
      {Array.isArray(data) ? 
        dateValue == 0 ? 
          data
            ?.filter((el) => Object.values(el).join().indexOf(filter) != -1)
            .map((el, index) => (
              <CardGroup>
                <Card key={index}>
                  <Card.Body>
                    <Card.Text>Income name:{el.nameIncome}</Card.Text>

                    <Card.Text>
                      Income description:{el.descriptionIncome}
                    </Card.Text>

                    <Card.Text>Income date:{el.dateIncome}</Card.Text>

                    <Card.Text>many to have:{el.manyToHave}</Card.Text>

                    <Card.Text>Income remain:{el.nameIncome}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                   
                      {Number(formatDistanceToNowStrict(
                        new Date(
                          el?.dateIncome.split("/")[2],
                          el?.dateIncome.split("/")[1] - 1,
                          el?.dateIncome.split("/")[0]
                        ),
                        { addSuffix: true, unit: "day" }
                      ).indexOf("ago") != -1 ? 
                      
                        Number(
                          formatDistanceToNowStrict(
                            new Date(
                              el?.dateIncome.split("/")[2],
                              el?.dateIncome.split("/")[1] - 1,
                              el?.dateIncome.split("/")[0]
                            ),
                            { addSuffix: true, unit: "day" }
                          ).substring(
                            0,
                            formatDistanceToNowStrict(
                              new Date(
                                el?.dateIncome.split("/")[2],
                                el?.dateIncome.split("/")[1] - 1,
                                el?.dateIncome.split("/")[0]
                              ),
                              { addSuffix: true, unit: "day" }
                            ).indexOf(" "))
                        )
                          
                        
                       : Number(
                          formatDistanceToNowStrict(
                            new Date(
                              el?.dateIncome.split("/")[2],
                              el?.dateIncome.split("/")[1] - 1,
                              el?.dateIncome.split("/")[0]
                            ),
                            { addSuffix: true, unit: "day" }
                          ).substring(
                            formatDistanceToNowStrict(
                              new Date(
                                el?.dateIncome.split("/")[2],
                                el?.dateIncome.split("/")[1] - 1,
                                el?.dateIncome.split("/")[0]
                              ),
                              { addSuffix: true, unit: "day" }
                            ).indexOf(" ")+1,
                            formatDistanceToNowStrict(
                              new Date(
                                el?.dateIncome.split("/")[2],
                                el?.dateIncome.split("/")[1] - 1,
                                el?.dateIncome.split("/")[0]
                              ),
                              { addSuffix: true, unit: "day" }
                            ).lastIndexOf(" ")
                          )
                        )) <=Number(el?.remainIncome) ? 
                        <Card.Text style={{ color: "red" }}>
                             {["in 0 day","0 days ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateIncome.split("/")[2],
                             el?.dateIncome.split("/")[1] - 1,
                             el?.dateIncome.split("/")[0]
                           ),
                           { addSuffix: true, unit: "day" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateIncome.split("/")[2],
                                el?.dateIncome.split("/")[1] - 1,
                                el?.dateIncome.split("/")[0]
                              ),
                              { addSuffix: true, unit: "hour" }
                            ):formatDistanceToNowStrict(
                              new Date(
                                    el?.dateIncome.split("/")[2],
                                    el?.dateIncome.split("/")[1] - 1,
                                    el?.dateIncome.split("/")[0]
                                  ),
                                  { addSuffix: true, unit: "day" }
                                )
                       }
                          {["in 0 hour","0 hour ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateIncome.split("/")[2],
                             el?.dateIncome.split("/")[1] - 1,
                             el?.dateIncome.split("/")[0]
                           ),
                           { addSuffix: true, unit: "hour" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateIncome.split("/")[2],
                                el?.dateIncome.split("/")[1] - 1,
                                el?.dateIncome.split("/")[0]
                              ),
                              { addSuffix: true, unit: "minute" }
                            ):""
                       }
                          {["in 0 minute","0 minute ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateIncome.split("/")[2],
                             el?.dateIncome.split("/")[1] - 1,
                             el?.dateIncome.split("/")[0]
                           ),
                           { addSuffix: true, unit: "minute" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateIncome.split("/")[2],
                                el?.dateIncome.split("/")[1] - 1,
                                el?.dateIncome.split("/")[0]
                              ),
                              { addSuffix: true, unit: "second" }
                            ):""
                       }
                        </Card.Text>
                       : 
                        <Card.Text style={{ color: "green" }}>
                               {["in 0 day","0 days ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateIncome.split("/")[2],
                             el?.dateIncome.split("/")[1] - 1,
                             el?.dateIncome.split("/")[0]
                           ),
                           { addSuffix: true, unit: "day" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateIncome.split("/")[2],
                                el?.dateIncome.split("/")[1] - 1,
                                el?.dateIncome.split("/")[0]
                              ),
                              { addSuffix: true, unit: "hour" }
                            ):formatDistanceToNowStrict(
                              new Date(
                                    el?.dateIncome.split("/")[2],
                                    el?.dateIncome.split("/")[1] - 1,
                                    el?.dateIncome.split("/")[0]
                                  ),
                                  { addSuffix: true, unit: "day" }
                                )
                       }
                          {["in 0 hour","0 hour ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateIncome.split("/")[2],
                             el?.dateIncome.split("/")[1] - 1,
                             el?.dateIncome.split("/")[0]
                           ),
                           { addSuffix: true, unit: "hour" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateIncome.split("/")[2],
                                el?.dateIncome.split("/")[1] - 1,
                                el?.dateIncome.split("/")[0]
                              ),
                              { addSuffix: true, unit: "minute" }
                            ):""
                       }
                          {["in 0 minute","0 minute ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateIncome.split("/")[2],
                             el?.dateIncome.split("/")[1] - 1,
                             el?.dateIncome.split("/")[0]
                           ),
                           { addSuffix: true, unit: "minute" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateIncome.split("/")[2],
                                el?.dateIncome.split("/")[1] - 1,
                                el?.dateFactor.split("/")[0]
                              ),
                              { addSuffix: true, unit: "second" }
                            ):""
                       }
                        </Card.Text>
                      }
                    </small>
                  </Card.Footer>
                </Card>
              </CardGroup>
            ))
         : 
          data
            .filter((el) =>
              format(
                new Date(
                  el?.dateIncome.split("/")[2],
                  el?.dateIncome.split("/")[1] - 1,
                  el?.dateIncome.split("/")[0]
                ),
                "dd/MM/yyyy"
              ) == format(subDays(new Date(), -Number(dateValue)), "dd/MM/yyyy")
                ? el
                : ""
            )
            .map((el, index) => (
              <>
            
                <Card key={index}>
                  <Card.Body>
                    <div className="customCardY-card-body">
                      <div>
                        <Card.Text>Income name:{el.nameIncome}</Card.Text>

                        <Card.Text>
                          Income description:{el.descriptionIncome}
                        </Card.Text>

                        <Card.Text>Income date:{el.dateIncome}</Card.Text>

                        <Card.Text>many to have:{el.manyToHave}</Card.Text>

                        <Card.Text>Income remain:{el.nameIncome}0</Card.Text>
                      </div>
                    </div>
                  </Card.Body>

                  <Card.Footer>
                  <small className="text-muted">
                   
                      {Number(formatDistanceToNowStrict(
                        new Date(
                          el?.dateIncome.split("/")[2],
                          el?.dateIncome.split("/")[1] - 1,
                          el?.dateIncome.split("/")[0]
                        ),
                        { addSuffix: true, unit: "day" }
                      ).indexOf("ago") != -1 ? 
                      
                        Number(
                          formatDistanceToNowStrict(
                            new Date(
                              el?.dateIncome.split("/")[2],
                              el?.dateIncome.split("/")[1] - 1,
                              el?.dateIncome.split("/")[0]
                            ),
                            { addSuffix: true, unit: "day" }
                          ).substring(
                            0,
                            formatDistanceToNowStrict(
                              new Date(
                                el?.dateIncome.split("/")[2],
                                el?.dateIncome.split("/")[1] - 1,
                                el?.dateIncome.split("/")[0]
                              ),
                              { addSuffix: true, unit: "day" }
                            ).indexOf(" "))
                        )
                          
                        
                       : Number(
                          formatDistanceToNowStrict(
                            new Date(
                              el?.dateIncome.split("/")[2],
                              el?.dateIncome.split("/")[1] - 1,
                              el?.dateIncome.split("/")[0]
                            ),
                            { addSuffix: true, unit: "day" }
                          ).substring(
                            formatDistanceToNowStrict(
                              new Date(
                                el?.dateIncome.split("/")[2],
                                el?.dateIncome.split("/")[1] - 1,
                                el?.dateIncome.split("/")[0]
                              ),
                              { addSuffix: true, unit: "day" }
                            ).indexOf(" ")+1,
                            formatDistanceToNowStrict(
                              new Date(
                                el?.dateIncome.split("/")[2],
                                el?.dateIncome.split("/")[1] - 1,
                                el?.dateIncome.split("/")[0]
                              ),
                              { addSuffix: true, unit: "day" }
                            ).lastIndexOf(" ")
                          )
                        )) <=Number(el?.remainIncome) ? 
                        <Card.Text style={{ color: "red" }}>
                           {["in 0 day","0 days ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateIncome.split("/")[2],
                             el?.dateIncome.split("/")[1] - 1,
                             el?.dateIncome.split("/")[0]
                           ),
                           { addSuffix: true, unit: "day" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateIncome.split("/")[2],
                                el?.dateIncome.split("/")[1] - 1,
                                el?.dateIncome.split("/")[0]
                              ),
                              { addSuffix: true, unit: "hour" }
                            ):formatDistanceToNowStrict(
                              new Date(
                                    el?.dateIncome.split("/")[2],
                                    el?.dateIncome.split("/")[1] - 1,
                                    el?.dateIncome.split("/")[0]
                                  ),
                                  { addSuffix: true, unit: "day" }
                                )
                       }
                          {["in 0 hour","0 hour ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateIncome.split("/")[2],
                             el?.dateIncome.split("/")[1] - 1,
                             el?.dateIncome.split("/")[0]
                           ),
                           { addSuffix: true, unit: "hour" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateIncome.split("/")[2],
                                el?.dateIncome.split("/")[1] - 1,
                                el?.dateIncome.split("/")[0]
                              ),
                              { addSuffix: true, unit: "minute" }
                            ):""
                       }
                          {["in 0 minute","0 minute ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateIncome.split("/")[2],
                             el?.dateIncome.split("/")[1] - 1,
                             el?.dateIncome.split("/")[0]
                           ),
                           { addSuffix: true, unit: "minute" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateIncome.split("/")[2],
                                el?.dateIncome.split("/")[1] - 1,
                                el?.dateIncome.split("/")[0]
                              ),
                              { addSuffix: true, unit: "second" }
                            ):""
                       }
                   </Card.Text>
                      
                       : 
                        <Card.Text style={{ color: "green" }}>
                               {["in 0 day","0 days ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateIncome.split("/")[2],
                             el?.dateIncome.split("/")[1] - 1,
                             el?.dateIncome.split("/")[0]
                           ),
                           { addSuffix: true, unit: "day" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateIncome.split("/")[2],
                                el?.dateIncome.split("/")[1] - 1,
                                el?.dateIncome.split("/")[0]
                              ),
                              { addSuffix: true, unit: "hour" }
                            ):formatDistanceToNowStrict(
                              new Date(
                                    el?.dateIncome.split("/")[2],
                                    el?.dateIncome.split("/")[1] - 1,
                                    el?.dateIncome.split("/")[0]
                                  ),
                                  { addSuffix: true, unit: "day" }
                                )
                       }
                          {["in 0 hour","0 hour ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateIncome.split("/")[2],
                             el?.dateIncome.split("/")[1] - 1,
                             el?.dateIncome.split("/")[0]
                           ),
                           { addSuffix: true, unit: "hour" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateIncome.split("/")[2],
                                el?.dateIncome.split("/")[1] - 1,
                                el?.dateIncome.split("/")[0]
                              ),
                              { addSuffix: true, unit: "minute" }
                            ):""
                       }
                          {["in 0 minute","0 minute ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateIncome.split("/")[2],
                             el?.dateIncome.split("/")[1] - 1,
                             el?.dateIncome.split("/")[0]
                           ),
                           { addSuffix: true, unit: "minute" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateIncome.split("/")[2],
                                el?.dateIncome.split("/")[1] - 1,
                                el?.dateIncome.split("/")[0]
                              ),
                              { addSuffix: true, unit: "second" }
                            ):""
                       }
                        </Card.Text>
                      }
                    </small>
                  </Card.Footer>
                </Card>
              </>
            )
        
      ) : (
        <>{data?.msg}</>
      )}
    </div>
  );
};

export default customCardX;
