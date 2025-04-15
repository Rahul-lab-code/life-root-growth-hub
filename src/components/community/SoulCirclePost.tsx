
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, MessageSquare, Flag, MoreHorizontal } from "lucide-react";
import { formatDistance } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/sonner";

interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImg?: string;
  createdAt: Date;
}

interface PostProps {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImg?: string;
  isAnonymous: boolean;
  createdAt: Date;
  likes: number;
  comments: Comment[];
  category?: "eco" | "eq" | "values";
  onLike: (postId: string) => void;
}

const SoulCirclePost: React.FC<PostProps> = ({
  id,
  content,
  authorId,
  authorName,
  authorImg,
  isAnonymous,
  createdAt,
  likes,
  comments,
  category,
  onLike,
}) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike(id);

    if (!liked) {
      toast.success("You've supported this post");
    }
  };

  const handleComment = () => {
    if (!commentText.trim()) return;

    // TODO: Submit comment to backend
    // API endpoint: POST /api/community/posts/{postId}/comments
    // Request body: { content: commentText }

    toast.success("Comment posted!");
    setCommentText("");
    setShowCommentForm(false);
  };

  const handleReport = () => {
    // TODO: Submit report to backend
    // API endpoint: POST /api/community/posts/{postId}/report
    toast.success("Post reported to moderators. Thank you for helping keep our community safe.");
  };

  const visibleComments = showAllComments ? comments : comments.slice(0, 2);
  const remainingComments = comments.length - 2;

  const getCategoryClass = () => {
    switch (category) {
      case "eco":
        return "text-liferoot-green";
      case "eq":
        return "text-liferoot-blue";
      case "values":
        return "text-liferoot-yellow-dark";
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              {isAnonymous ? (
                <AvatarFallback className="bg-muted">A</AvatarFallback>
              ) : (
                <>
                  <AvatarImage src={authorImg} />
                  <AvatarFallback>
                    {authorName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </>
              )}
            </Avatar>
            <div>
              <div className="font-medium">
                {isAnonymous ? "Anonymous" : authorName}
                {category && (
                  <span className={`ml-2 text-sm ${getCategoryClass()}`}>
                    #{category}
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDistance(new Date(createdAt), new Date(), {
                  addSuffix: true,
                })}
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="px-1">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(content)}>
                Copy text
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleReport} className="text-destructive">
                Report post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="whitespace-pre-wrap">{content}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start pt-0">
        <div className="flex w-full justify-between items-center pb-2">
          <div className="flex gap-2">
            <Button
              variant={liked ? "default" : "outline"}
              size="sm"
              className={liked ? "bg-liferoot-blue" : ""}
              onClick={handleLike}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              {liked ? "Supported" : "Support"} ({likes + (liked ? 1 : 0)})
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCommentForm(!showCommentForm)}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Comment ({comments.length})
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={handleReport}>
            <Flag className="h-4 w-4 mr-1" />
            Report
          </Button>
        </div>

        {/* Comments section */}
        {comments.length > 0 && (
          <div className="w-full border-t pt-3 space-y-3">
            {visibleComments.map((comment) => (
              <div key={comment.id} className="flex gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={comment.authorImg} />
                  <AvatarFallback>
                    {comment.authorName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted p-2 rounded-md">
                    <div className="font-medium text-sm">{comment.authorName}</div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatDistance(new Date(comment.createdAt), new Date(), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {remainingComments > 0 && !showAllComments && (
              <Button
                variant="ghost"
                size="sm"
                className="mx-auto"
                onClick={() => setShowAllComments(true)}
              >
                Show {remainingComments} more {remainingComments === 1 ? "comment" : "comments"}
              </Button>
            )}
          </div>
        )}

        {/* Comment form */}
        {showCommentForm && (
          <div className="w-full pt-3 space-y-2">
            <Textarea
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="resize-none"
              rows={2}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCommentForm(false)}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleComment}>
                Post Comment
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default SoulCirclePost;
