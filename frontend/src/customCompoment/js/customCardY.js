import React from "react";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import "../css/customCardY.css";
import subDays from "date-fns/subDays";
import format from "date-fns/format";
import subMonths from "date-fns/subMonths";
import compareAsc from "date-fns/compareAsc";
import formatDistance from "date-fns/formatDistance";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

const CustomCardY = ({ data, filter, dateValue }) => {
  const { imageUrl } = useSelector((state) => state);
  console.log(dateValue);

  return (
    <div>
      {Array.isArray(data) ? (
        dateValue == 0 ? (
          data
            ?.filter((el) =>
              Object.values(el).join().indexOf(filter) != -1 ? el : ""
            )
            .map((el, index) => (
              <Card key={index}>
                <Card.Body>
                  <div className="customCardY-card-body">
                    <div>
                      <Card.Text>
                        Factor description:{el.descriptionFactor}
                      </Card.Text>
                      <Card.Text>Client:{el.client}</Card.Text>

                      <Card.Text>Factor date:{el.dateFactor}</Card.Text>
                      <Card.Text>Value to pay:{el.valueToPay}</Card.Text>
                      <Card.Text>Factor remain:{el.remainFactor}</Card.Text>
                    </div>
                    <div className="customCardY-card-body-image">
                      <img
                        className="customCardY-card-image"
                        src={imageUrl + "/" + el.imageFactor}
                        onClick={() =>
                          (window.location.href =
                            imageUrl + "/" + el.imageFactor)
                        }
                      />
                    </div>
                  </div>
                </Card.Body>

                <Card.Footer>
                  <small className="text-muted">
                    {Number(formatDistanceToNowStrict(
                      new Date(
                        el?.dateFactor.split("/")[2],
                        el?.dateFactor.split("/")[1] - 1,
                        el?.dateFactor.split("/")[0]
                      ),
                      { addSuffix: true, unit: "day" }
                    ).indexOf("ago") != -1 ? 
                      Number(
                        formatDistanceToNowStrict(
                          new Date(
                            el?.dateFactor.split("/")[2],
                            el?.dateFactor.split("/")[1] - 1,
                            el?.dateFactor.split("/")[0]
                          ),
                          { addSuffix: true, unit: "day" }
                        ).substring(
                          0,
                          formatDistanceToNowStrict(
                            new Date(
                              el?.dateFactor.split("/")[2],
                              el?.dateFactor.split("/")[1] - 1,
                              el?.dateFactor.split("/")[0]
                            ),
                            { addSuffix: true, unit: "day" }
                          ).indexOf(" ")
                        )  
                      )
                     : Number(
                        formatDistanceToNowStrict(
                          new Date(
                            el?.dateFactor.split("/")[2],
                            el?.dateFactor.split("/")[1] - 1,
                            el?.dateFactor.split("/")[0]
                          ),
                          { addSuffix: true, unit: "day" }
                        ).substring(
                          formatDistanceToNowStrict(
                            new Date(
                              el?.dateFactor.split("/")[2],
                              el?.dateFactor.split("/")[1] - 1,
                              el?.dateFactor.split("/")[0]
                            ),
                            { addSuffix: true, unit: "day" }
                          ).indexOf(" ")+1,
                          formatDistanceToNowStrict(
                            new Date(
                              el?.dateFactor.split("/")[2],
                              el?.dateFactor.split("/")[1] - 1,
                              el?.dateFactor.split("/")[0]
                            ),
                            { addSuffix: true, unit: "day" }
                          ).lastIndexOf(" ")
                        )
                      
                    )) <=Number(el?.remainFactor) ? 
                      <Card.Text style={{ color: "red" }}>
                      {["in 0 day","0 days ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateFactor.split("/")[2],
                             el?.dateFactor.split("/")[1] - 1,
                             el?.dateFactor.split("/")[0]
                           ),
                           { addSuffix: true, unit: "day" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateFactor.split("/")[2],
                                el?.dateFactor.split("/")[1] - 1,
                                el?.dateFactor.split("/")[0]
                              ),
                              { addSuffix: true, unit: "hour" }
                            ):formatDistanceToNowStrict(
                              new Date(
                                    el?.dateFactor.split("/")[2],
                                    el?.dateFactor.split("/")[1] - 1,
                                    el?.dateFactor.split("/")[0]
                                  ),
                                  { addSuffix: true, unit: "day" }
                                )
                       }
                          {["in 0 hour","0 hour ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateFactor.split("/")[2],
                             el?.dateFactor.split("/")[1] - 1,
                             el?.dateFactor.split("/")[0]
                           ),
                           { addSuffix: true, unit: "hour" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateFactor.split("/")[2],
                                el?.dateFactor.split("/")[1] - 1,
                                el?.dateFactor.split("/")[0]
                              ),
                              { addSuffix: true, unit: "minute" }
                            ):""
                       }
                          {["in 0 minute","0 minute ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateFactor.split("/")[2],
                             el?.dateFactor.split("/")[1] - 1,
                             el?.dateFactor.split("/")[0]
                           ),
                           { addSuffix: true, unit: "minute" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateFactor.split("/")[2],
                                el?.dateFactor.split("/")[1] - 1,
                                el?.dateFactor.split("/")[0]
                              ),
                              { addSuffix: true, unit: "second" }
                            ):""
                       }
                        
                       
                 </Card.Text>
                     
                     :
                     <Card.Text style={{ color: "green" }}>
                        {["in 0 day","0 days ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateFactor.split("/")[2],
                             el?.dateFactor.split("/")[1] - 1,
                             el?.dateFactor.split("/")[0]
                           ),
                           { addSuffix: true, unit: "day" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateFactor.split("/")[2],
                                el?.dateFactor.split("/")[1] - 1,
                                el?.dateFactor.split("/")[0]
                              ),
                              { addSuffix: true, unit: "hour" }
                            ):formatDistanceToNowStrict(
                              new Date(
                                    el?.dateFactor.split("/")[2],
                                    el?.dateFactor.split("/")[1] - 1,
                                    el?.dateFactor.split("/")[0]
                                  ),
                                  { addSuffix: true, unit: "day" }
                                )
                       }
                          {["in 0 hour","0 hour ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateFactor.split("/")[2],
                             el?.dateFactor.split("/")[1] - 1,
                             el?.dateFactor.split("/")[0]
                           ),
                           { addSuffix: true, unit: "hour" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateFactor.split("/")[2],
                                el?.dateFactor.split("/")[1] - 1,
                                el?.dateFactor.split("/")[0]
                              ),
                              { addSuffix: true, unit: "minute" }
                            ):""
                       }
                          {["in 0 minute","0 minute ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateFactor.split("/")[2],
                             el?.dateFactor.split("/")[1] - 1,
                             el?.dateFactor.split("/")[0]
                           ),
                           { addSuffix: true, unit: "minute" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateFactor.split("/")[2],
                                el?.dateFactor.split("/")[1] - 1,
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
            ))
        ) : (
          data
            .filter((el) =>
              format(
                new Date(
                  el?.dateFactor.split("/")[2],
                  el?.dateFactor.split("/")[1] - 1,
                  el?.dateFactor.split("/")[0]
                ),
                "dd/MM/yyyy"
              )+""+ format(subDays(new Date(), -Number(dateValue)), "dd/MM/yyyy")
              
            )
            .map((el, index) => (
              <>
                <Card key={index}>
                  <Card.Body>
                    <div className="customCardY-card-body">
                      <div>
                        <Card.Text>
                          Factor description:{el.descriptionFactor}
                        </Card.Text>
                        <Card.Text>Client:{el.client}</Card.Text>

                        <Card.Text>Factor date:{el.dateFactor}</Card.Text>
                        <Card.Text>Value to pay:{el.valueToPay}</Card.Text>
                        <Card.Text>Factor remain:{el.dateFactor}</Card.Text>
                      </div>
                      <div className="customCardY-card-body-image">
                        <img
                          className="customCardY-card-image"
                          src={imageUrl + "/" + el.imageFactor}
                          onClick={() =>
                            (window.location.href =
                              imageUrl + "/" + el.imageFactor)
                          }
                        />
                      </div>
                    </div>
                  </Card.Body>

                  <Card.Footer>
                    <small className="text-muted">

                   
                      {Number(formatDistanceToNowStrict(
                        new Date(
                          el?.dateFactor.split("/")[2],
                          el?.dateFactor.split("/")[1] - 1,
                          el?.dateFactor.split("/")[0]
                        ),
                        { addSuffix: true, unit: "day" }
                      ).indexOf("ago") != -1 ? (
                        Number(
                          formatDistanceToNowStrict(
                            new Date(
                              el?.dateFactor.split("/")[2],
                              el?.dateFactor.split("/")[1] - 1,
                              el?.dateFactor.split("/")[0]
                            ),
                            { addSuffix: true, unit: "day" }
                          ).substring(
                            0,
                            formatDistanceToNowStrict(
                              new Date(
                                el?.dateFactor.split("/")[2],
                                el?.dateFactor.split("/")[1] - 1,
                                el?.dateFactor.split("/")[0]
                              ),
                              { addSuffix: true, unit: "day" }
                            ).indexOf(" ")
                          )
                        )
                      ) : Number(
                          formatDistanceToNowStrict(
                            new Date(
                              el?.dateFactor.split("/")[2],
                              el?.dateFactor.split("/")[1] - 1,
                              el?.dateFactor.split("/")[0]
                            ),
                            { addSuffix: true, unit: "day" }
                          ).substring(
                            formatDistanceToNowStrict(
                              new Date(
                                el?.dateFactor.split("/")[2],
                                el?.dateFactor.split("/")[1] - 1,
                                el?.dateFactor.split("/")[0]
                              ),
                              { addSuffix: true, unit: "day" }
                            ).indexOf(" ")+1,
                            formatDistanceToNowStrict(
                              new Date(
                                el?.dateFactor.split("/")[2],
                                el?.dateFactor.split("/")[1] - 1,
                                el?.dateFactor.split("/")[0]
                              ),
                              { addSuffix: true, unit: "day" }
                            ).lastIndexOf(" ")
                          )
                        )) <= Number(el.remainFactor) ? 
                        <Card.Text style={{ color: "red" }}>
                           {["in 0 day","0 days ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateFactor.split("/")[2],
                             el?.dateFactor.split("/")[1] - 1,
                             el?.dateFactor.split("/")[0]
                           ),
                           { addSuffix: true, unit: "day" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateFactor.split("/")[2],
                                el?.dateFactor.split("/")[1] - 1,
                                el?.dateFactor.split("/")[0]
                              ),
                              { addSuffix: true, unit: "hour" }
                            ):formatDistanceToNowStrict(
                              new Date(
                                    el?.dateFactor.split("/")[2],
                                    el?.dateFactor.split("/")[1] - 1,
                                    el?.dateFactor.split("/")[0]
                                  ),
                                  { addSuffix: true, unit: "day" }
                                )
                       }
                          {["in 0 hour","0 hour ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateFactor.split("/")[2],
                             el?.dateFactor.split("/")[1] - 1,
                             el?.dateFactor.split("/")[0]
                           ),
                           { addSuffix: true, unit: "hour" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateFactor.split("/")[2],
                                el?.dateFactor.split("/")[1] - 1,
                                el?.dateFactor.split("/")[0]
                              ),
                              { addSuffix: true, unit: "minute" }
                            ):""
                       }
                          {["in 0 minute","0 minute ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateFactor.split("/")[2],
                             el?.dateFactor.split("/")[1] - 1,
                             el?.dateFactor.split("/")[0]
                           ),
                           { addSuffix: true, unit: "minute" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateFactor.split("/")[2],
                                el?.dateFactor.split("/")[1] - 1,
                                el?.dateFactor.split("/")[0]
                              ),
                              { addSuffix: true, unit: "second" }
                            ):""
                       }
                   </Card.Text>
                       :   <Card.Text style={{ color: "green" }}>
                          {["in 0 day","0 days ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateFactor.split("/")[2],
                             el?.dateFactor.split("/")[1] - 1,
                             el?.dateFactor.split("/")[0]
                           ),
                           { addSuffix: true, unit: "day" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateFactor.split("/")[2],
                                el?.dateFactor.split("/")[1] - 1,
                                el?.dateFactor.split("/")[0]
                              ),
                              { addSuffix: true, unit: "hour" }
                            ):formatDistanceToNowStrict(
                              new Date(
                                    el?.dateFactor.split("/")[2],
                                    el?.dateFactor.split("/")[1] - 1,
                                    el?.dateFactor.split("/")[0]
                                  ),
                                  { addSuffix: true, unit: "day" }
                                )
                       }
                          {["in 0 hour","0 hour ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateFactor.split("/")[2],
                             el?.dateFactor.split("/")[1] - 1,
                             el?.dateFactor.split("/")[0]
                           ),
                           { addSuffix: true, unit: "hour" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateFactor.split("/")[2],
                                el?.dateFactor.split("/")[1] - 1,
                                el?.dateFactor.split("/")[0]
                              ),
                              { addSuffix: true, unit: "minute" }
                            ):""
                       }
                          {["in 0 minute","0 minute ago"].includes(formatDistanceToNowStrict(
                       new Date(
                             el?.dateFactor.split("/")[2],
                             el?.dateFactor.split("/")[1] - 1,
                             el?.dateFactor.split("/")[0]
                           ),
                           { addSuffix: true, unit: "minute" }
                         ))?formatDistanceToNowStrict(
                          new Date(
                                el?.dateFactor.split("/")[2],
                                el?.dateFactor.split("/")[1] - 1,
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
              </>
            ))
        )
      ) : (
        <>{data?.msg}</>
      )}
    </div>
  );
};

export default CustomCardY;
